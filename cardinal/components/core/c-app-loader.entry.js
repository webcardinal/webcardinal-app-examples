import { r as registerInstance, h, e as Host, g as getElement } from './index-f6e31a6c.js';

const LOADER_TYPES = [
  'default',
  'iframe',
  'object'
];
const CAppLoader = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.defaults = {
      type: LOADER_TYPES[0],
    };
    this.src = null;
    this.type = this.defaults.type;
    this.content = null;
    this.error = false;
  }
  async _getContent() {
    try {
      const response = await fetch(this.src);
      this.error = false;
      return await response.text();
    }
    catch (error) {
      this.error = true;
      throw error;
    }
  }
  async componentWillLoad() {
    this.type = this.type.toLowerCase();
    if (!LOADER_TYPES.includes(this.type)) {
      this.type = this.defaults.type;
    }
  }
  async componentWillRender() {
    this._getContent()
      .then(data => this.content = data)
      .catch(error => console.error(error));
  }
  render() {
    if (this.error) {
      return h("h4", null, `Page ${this.src} could not be loaded!`);
    }
    switch (this.type) {
      case 'iframe': {
        const attributes = {
          frameBorder: 0,
          src: 'data:text/html;charset=utf-8, ' + escape(this.content),
          style: {
            overflow: 'hidden',
            width: '100%', height: '100%'
          }
        };
        return h("iframe", Object.assign({}, attributes));
      }
      case 'object': {
        const attributes = {
          data: this.src,
          type: 'text/html',
          style: {
            display: 'block',
            width: '100%', height: '100%'
          }
        };
        return h("object", Object.assign({}, attributes));
      }
      default: {
        const attributes = {
          style: {
            width: '100%', height: '100%'
          }
        };
        this.host.innerHTML = this.content;
        return (h(Host, Object.assign({}, attributes), h("slot", null)));
      }
    }
  }
  get host() { return getElement(this); }
};

export { CAppLoader as c_app_loader };
