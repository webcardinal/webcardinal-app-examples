import { r as registerInstance, h, e as Host, g as getElement } from './index-f6e31a6c.js';

const CAppMenuItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.base = '';
    this.level = 0;
    this.mode = null;
    this._setMode = () => {
      if (!this.mode) {
        let element = this.host.parentElement;
        while (element.tagName.toLowerCase() !== 'c-app-menu') {
          element = element.parentElement;
        }
        this.mode = element.getAttribute('mode');
      }
    };
    this._trimmedPath = (path) => {
      return path.endsWith('/') ? path.slice(0, -1) : path;
    };
  }
  handleClick(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    this._setMode();
    if (this.mode === 'vertical') {
      const item = e.currentTarget;
      const dropdown = item.parentElement;
      dropdown.toggleAttribute('active');
    }
  }
  ;
  render() {
    const { path, name, children } = this.item;
    const base = this._trimmedPath(this.base) + '/~dev-link';
    const href = this._trimmedPath(new URL(path, new URL(base, window.location.origin)).href);
    const dropdown = {
      attributes: {
        class: {
          'dropdown': true,
          [`level-${this.level}`]: true
        }
      },
      items: []
    };
    if (children) {
      const props = { base: href, level: this.level + 1 };
      children.forEach(item => {
        if (item.indexed) {
          props.item = item;
          dropdown.items.push(h("c-app-menu-item", Object.assign({}, props)));
        }
      });
    }
    const url = new URL(href).pathname;
    return (h(Host, null, !children
      ? h("stencil-route-link", { class: "item", url: url, "data-test-url": url }, name)
      : (h("div", Object.assign({}, dropdown.attributes), h("div", { class: "item", onClick: this.handleClick.bind(this) }, name), h("div", { class: "items" }, dropdown.items)))));
  }
  ;
  get host() { return getElement(this); }
};

export { CAppMenuItem as c_app_menu_item };
