import { r as registerInstance, h, g as getElement } from './index-f6e31a6c.js';

const defaultCAppContainerCss = "c-app-container{display:grid;grid-template-columns:1fr;grid-template-rows:1fr;gap:var(--c-app-container-gap);overflow-y:auto;background:var(--c-app-container-background)}c-app-container.slot-before{grid-template-rows:auto 1fr}c-app-container.slot-after{grid-template-rows:1fr auto}c-app-container.slot-before.slot-after{grid-template-rows:auto 1fr auto}";

const CAppContainer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.slots = {
      before: false,
      after: false,
      unnamed: false,
    };
  }
  async componentWillLoad() {
    // manage slots
    this.slots.unnamed = this.host.children.length > 0;
    for (const key of Object.keys(this.slots)) {
      if (this.host.querySelector(`[slot=${key}]`)) {
        this.slots[key] = true;
        this.host.classList.add(`slot-${key}`);
      }
      else {
        this.host.classList.remove(`slot-${key}`);
      }
    }
  }
  render() {
    return [
      (this.slots.before
        ? h("div", { class: "container before" }, h("slot", { name: "before" }))
        : null),
      h("div", { class: "container app-container" }, this.slots.unnamed ? h("slot", null) : h("c-app-router", null)),
      (this.slots.after
        ? h("div", { class: "container after" }, h("slot", { name: "after" }))
        : null)
    ];
  }
  get host() { return getElement(this); }
};
CAppContainer.style = {
  default: defaultCAppContainerCss
};

export { CAppContainer as c_app_container };
