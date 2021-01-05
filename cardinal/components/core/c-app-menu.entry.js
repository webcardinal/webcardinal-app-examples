import { r as registerInstance, f as createEvent, h, g as getElement } from './index-f6e31a6c.js';
import { p as promisifyEventEmit } from './index-11527551.js';

const cAppMenuHorizontalCss = "c-app-menu{display:grid;padding:var(--c-app-menu-padding)}c-app-menu c-app-menu-item{display:flex}c-app-menu c-app-menu-item .item{cursor:pointer}c-app-menu c-app-menu-item .item,c-app-menu c-app-menu-item .item a{color:var(--c-app-menu-color)}c-app-menu[mode=horizontal]{grid-template-columns:1fr;grid-template-rows:1fr;gap:var(--c-app-menu-gap)}c-app-menu[mode=horizontal].slot-before{grid-template-columns:auto 1fr}c-app-menu[mode=horizontal].slot-after{grid-template-columns:1fr auto}c-app-menu[mode=horizontal].slot-before.slot-after{grid-template-columns:auto 1fr auto}c-app-menu[mode=horizontal] .app-menu{display:flex;gap:var(--c-app-menu-gap)}c-app-menu[mode=horizontal] .app-menu c-app-menu-item .dropdown .items{margin-left:var(--c-app-menu-padding)}";

const cAppMenuVerticalCss = "c-app-menu{display:grid;padding:var(--c-app-menu-padding)}c-app-menu c-app-menu-item{display:flex}c-app-menu c-app-menu-item .item{cursor:pointer}c-app-menu c-app-menu-item .item,c-app-menu c-app-menu-item .item a{color:var(--c-app-menu-color)}c-app-menu[mode=vertical]{grid-template-columns:1fr;grid-template-rows:1fr;gap:var(--c-app-menu-gap);overflow-y:auto;min-width:var(--c-app-menu-min-width);max-width:var(--c-app-menu-max-width);background:var(--c-app-menu-background)}c-app-menu[mode=vertical].slot-before{grid-template-rows:auto 1fr}c-app-menu[mode=vertical].slot-after{grid-template-rows:1fr auto}c-app-menu[mode=vertical].slot-before.slot-after{grid-template-rows:auto 1fr auto}c-app-menu[mode=vertical] .app-menu.items,c-app-menu[mode=vertical] .app-menu .items{display:flex;flex-direction:column;align-content:start;row-gap:var(--c-app-menu-items-gap)}c-app-menu[mode=vertical] .app-menu .items{margin-top:calc(var(--c-app-menu-items-gap) * 0.65);margin-bottom:var(--c-app-menu-items-gap)}c-app-menu[mode=vertical] .app-menu c-app-menu-item .dropdown .items{display:none;margin-left:var(--c-app-menu-padding)}c-app-menu[mode=vertical] .app-menu c-app-menu-item .dropdown[active]>.items{display:grid}";

const CAppMenu = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.getRoutingConfigEvent = createEvent(this, "cardinal:config:getRouting", 7);
    this.items = [];
    this.slots = {
      before: false,
      after: false
    };
    this.modes = Object.keys(this._menu);
    this.defaultMode = this.modes[0];
    this.mode = this.defaultMode;
  }
  async componentWillLoad() {
    // get items
    if (this.items.length === 0) {
      try {
        const routing = await promisifyEventEmit(this.getRoutingConfigEvent);
        this.items = routing.pages;
      }
      catch (error) {
        console.error(error);
      }
    }
    // manage modes
    if (!this.modes.includes(this.mode)) {
      console.warn('c-app-menu', `You should use one of the following modes: ${this.modes.join(', ')}`);
      this.mode = this.defaultMode;
    }
    this.host.parentElement.setAttribute('layout', this.mode);
    // manage slots
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
  get _menu() {
    const renderMenu = () => {
      return [
        (this.slots.before
          ? h("div", { class: "container before" }, h("slot", { name: "before" }))
          : null),
        h("div", { class: "container app-menu items" }, this.items.map(item => item.indexed ? h("c-app-menu-item", { item: item }) : null)),
        (this.slots.after
          ? h("div", { class: "container after" }, h("slot", { name: "after" }))
          : null)
      ];
    };
    return {
      vertical: renderMenu(),
      horizontal: renderMenu()
    };
  }
  render() {
    return this._menu[this.mode];
  }
  get host() { return getElement(this); }
};
CAppMenu.style = {
  horizontal: cAppMenuHorizontalCss,
  vertical: cAppMenuVerticalCss
};

export { CAppMenu as c_app_menu };
