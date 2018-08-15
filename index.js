import pathToRegexp from "./vendor/path-to-regexp/index.js";

const isRouteNode = node =>
  node.nodeType === Node.ELEMENT_NODE && node.hasAttribute("data-path");

class Switch extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const node = document.createElement("slot");
    node.setAttribute("name", "matched");
    shadowRoot.appendChild(node);
    this.updateMatch = this.updateMatch.bind(this);
  }

  updateMatch(pathname) {
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

export class HashSwitch extends Switch {
  constructor() {
    super();
    this.handleHashChange = this.handleHashChange.bind(this);
    this.handleHashChange();
  }

  handleHashChange() {
    const path = location.hash.slice(1);
    this.updateMatch(path);
  }

  connectedCallback() {
    window.addEventListener("hashchange", this.handleHashChange);
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", this.handleHashChange);
  }
}

if (!window.customElements.get("hash-switch")) {
  window.HashSwitch = HashSwitch;
  window.customElements.define("hash-switch", HashSwitch);
}
