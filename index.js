import pathToRegexp from "./vendor/path-to-regexp/index.js";

const isElement = node => node.nodeType === Node.ELEMENT_NODE;

const isCustomElement = node =>
  node.tagName != null && node.tagName.includes("-");

const isRouteNode = node => node.hasAttribute("data-path");

export class Switch extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const node = document.createElement("slot");
    node.setAttribute("name", "matched");
    shadowRoot.appendChild(node);
    this.updateMatch = this.updateMatch.bind(this);
  }

  updateMatch(pathname) {
    if (pathname === "") {
      pathname = "/";
    }
    let matchFound = false;

    const routeNodes = Array.from(this.childNodes)
      .filter(isElement)
      .filter(isRouteNode);

    routeNodes.forEach(async node => {
      const path = node.dataset.path;
      const keys = [];
      const re = pathToRegexp(path, keys);
      const match = re.exec(pathname);
      const params = getParams(keys, match);

      if (match != null && matchFound === false) {
        matchFound = true;
        await Promise.all(
          Array.from(node.childNodes)
            .filter(isCustomElement)
            .map(async node => {
              await customElements.whenDefined(node.tagName.toLowerCase());
              node.match = {
                url: pathname,
                path,
                params
              };
            })
        );
        node.setAttribute("slot", "matched");
      } else {
        node.removeAttribute("slot");
      }
    });
  }
}

export class Route extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const node = document.createElement("slot");
    node.setAttribute("name", "unmatched");
    shadowRoot.appendChild(node);
    this.updateMatch = this.updateMatch.bind(this);
  }

  async updateMatch(pathname) {
    if (pathname === "") {
      pathname = "/";
    }

    const path = this.getAttribute("path");
    const keys = [];
    const re = pathToRegexp(path, keys);
    const match = re.exec(pathname);
    const params = getParams(keys, match);

    if (match) {
      await Promise.all(
        Array.from(this.childNodes)
          .filter(isCustomElement)
          .map(async node => {
            await customElements.whenDefined(node.tagName.toLowerCase());
            node.match = {
              url: pathname,
              path,
              params
            };
          })
      );
      this.shadowRoot.firstChild.removeAttribute("name");
    } else {
      this.shadowRoot.firstChild.setAttribute("name", "unmatched");
    }
  }
}

function getParams(keys, match) {
  return match == null
    ? {}
    : match.slice(1).reduce((params, value, index) => {
        params[keys[index].name] = value;
        return params;
      }, {});
}
