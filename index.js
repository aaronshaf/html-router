import pathToRegexp from "./vendor/path-to-regexp/index.js";

const isRouteNode = node =>
  node.nodeType === Node.ELEMENT_NODE && node.hasAttribute("data-path");

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

    const routeNodes = Array.from(this.childNodes).filter(isRouteNode);

    routeNodes.forEach(node => {
      const path = node.dataset.path;
      const keys = [];
      const re = pathToRegexp(path, keys);
      const result = re.exec(pathname);

      if (result && matchFound === false) {
        matchFound = true;
        node.setAttribute("slot", "matched");
      } else {
        node.removeAttribute("slot");
      }
    });
  }
}
