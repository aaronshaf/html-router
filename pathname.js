import { Switch, Route } from "./index.js";

let isPushStatedObserved = false;

// https://stackoverflow.com/a/25673911
export const listenToPushState = () => {
  const _wr = type => {
    const orig = history[type];
    return function() {
      const rv = orig.apply(this, arguments);
      const e = new Event(type);
      e.arguments = arguments;
      window.dispatchEvent(e);
      return rv;
    };
  };
  (history.pushState = _wr("pushState")),
    (history.replaceState = _wr("replaceState"));
  isPushStatedObserved = true;
};

export class PathnameSwitch extends Switch {
  constructor() {
    super();
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleStateChange();
  }

  handleStateChange() {
    this.updateMatch(location.pathname);
  }

  connectedCallback() {
    if (isPushStatedObserved === false) {
      listenToPushState();
    }

    window.addEventListener("popstate", this.handleStateChange);
    window.addEventListener("pushState", this.handleStateChange);
  }

  disconnectedCallback() {
    window.removeEventListener("popstate", this.handleStateChange);
    window.removeEventListener("pushState", this.handleStateChange);
  }
}

if (window.customElements.get("pathname-switch") == null) {
  window.PathnameSwitch = PathnameSwitch;
  window.customElements.define("pathname-switch", PathnameSwitch);
}

class PushStateLink extends HTMLElement {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (event.metaKey) {
      return true;
    }
    event.preventDefault();
    const href = this.a.getAttribute("href");
    window.history.pushState({}, "", href);
  }

  connectedCallback() {
    this.a = this.querySelector("a");
    this.a.addEventListener("click", this.handleClick);
  }

  disconnectedCallback() {
    this.a.removeEventListener("click", this.handleClick);
  }
}

if (window.customElements.get("pushstate-link") == null) {
  window.PushStateLink = PushStateLink;
  window.customElements.define("pushstate-link", PushStateLink);
}

export class PathnameRoute extends Route {
  constructor() {
    super();
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleStateChange();
  }

  handleStateChange() {
    this.updateMatch(location.pathname);
  }

  connectedCallback() {
    if (isPushStatedObserved === false) {
      listenToPushState();
    }

    window.addEventListener("popstate", this.handleStateChange);
    window.addEventListener("pushState", this.handleStateChange);
  }

  disconnectedCallback() {
    window.removeEventListener("popstate", this.handleStateChange);
    window.removeEventListener("pushState", this.handleStateChange);
  }
}

if (window.customElements.get("pathname-route") == null) {
  window.HashRoute = PathnameRoute;
  window.customElements.define("pathname-route", PathnameRoute);
}
