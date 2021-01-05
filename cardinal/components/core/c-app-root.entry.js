import { r as registerInstance, h, g as getElement } from './index-f6e31a6c.js';
import { C as ControllerRegistryService } from './index-90c78558.js';
import './active-router-f528d396.js';
import { e as executeFetch, i as injectHistory } from './fetch-33d1b3b3.js';
import './match-path-760e1797.js';
import './location-utils-fea12957.js';

// config
const defaultConfig = {
  identity: {
    name: 'Cardinal',
    email: 'privatesky@axiologic.net',
    avatar: '__TODO__'
  },
  version: '1.0.0',
  pages: [
    {
      name: 'Homepage',
      path: '/',
      src: 'index.html'
    }
  ],
  pagesPathname: 'pages'
};

const EVENTS = {
  GET_ROUTING: 'getRouting'
};
const EVENTS$1 = (_ => {
  const placeholder = 'cardinal:config:';
  const events = EVENTS;
  for (const key of Object.keys(events)) {
    if (key !== placeholder) {
      events[key] = placeholder + events[key];
    }
  }
  return events;
})();

const CONFIG_PATH = 'cardinal.json';
class ApplicationController {
  constructor(element) {
    this._trimPathname = (path) => {
      if (path.startsWith('/')) {
        path = path.slice(1);
      }
      if (path.endsWith('/')) {
        path = path.slice(0, -1);
      }
      return path;
    };
    this.baseURL = this._getBaseURL();
    this.configURL = this._getResourceURL(CONFIG_PATH);
    this.config = {};
    this.pendingRequests = [];
    this.isConfigLoaded = false;
    this._getConfiguration((error, rawConfig) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log('rawConfig', rawConfig);
      this.config = this._prepareConfiguration(rawConfig);
      this.isConfigLoaded = true;
      while (this.pendingRequests.length) {
        let request = this.pendingRequests.pop();
        this._provideConfiguration(request.configKey, request.callback);
      }
      console.log('config', this.config);
    });
    element.addEventListener(EVENTS$1.GET_ROUTING, this._registerListener('routing'));
    // TODO: production version
    // element.addEventListener(EVENTS.GET_THEME, this._registerListener('theme'));
    // TODO: development progress
    element.addEventListener('getThemeConfig', this._registerListener('theme'));
    window.basePath = this.baseURL.href;
    const t_debugger = [
      'getAppVersion',
      'needRoutes',
      'needMenuItems',
      'getUserInfo',
      'getHistoryType',
      'getModals',
      'getTags',
      'getConfiguration',
      'validateUrl',
      'getCustomLandingPage'
    ];
    for (const t of t_debugger)
      element.addEventListener(t, (e) => console.log(e, t));
    console.log(element);
  }
  _getBaseURL() {
    const getBaseElementHref = () => {
      let baseElement = document.querySelector('base');
      if (!baseElement) {
        return null;
      }
      let href = baseElement.getAttribute('href');
      if (!href || href === '/') {
        return null;
      }
      return this._trimPathname(href);
    };
    const getWindowLocation = () => {
      return this._trimPathname(window.location.origin);
    };
    let windowLocation = getWindowLocation();
    let baseHref = getBaseElementHref();
    return baseHref ? new URL(baseHref, windowLocation) : new URL(windowLocation);
  }
  _getResourceURL(resource) {
    return new URL(this._trimPathname(this.baseURL.href) + '/' + this._trimPathname(resource));
  }
  _getConfiguration(callback) {
    const fetchJSON = async (path) => {
      let response = await executeFetch(path);
      return response.json();
    };
    const loadConfiguration = async () => {
      try {
        return fetchJSON(this.configURL.href);
      }
      catch (error) {
        return error;
      }
    };
    loadConfiguration()
      .then(data => callback(null, data))
      .catch(error => callback(error));
  }
  _prepareConfiguration(rawConfig) {
    const getRaw = (item) => {
      if (rawConfig[item]) {
        return rawConfig[item];
      }
      return defaultConfig[item];
    };
    const getIdentity = (rawIdentity = getRaw('identity')) => {
      const defaultIdentity = defaultConfig.identity;
      const result = {};
      for (const key of Object.keys(defaultIdentity)) {
        result[key] = rawIdentity[key] || defaultIdentity[key];
      }
      return result;
    };
    const getBaseURL = (rawBaseURL = this.baseURL.href) => this._trimPathname(rawBaseURL);
    const getPages = (baseURL = this.baseURL.href, rawPages = getRaw('pages')) => {
      let pages = [];
      for (let rawPage of rawPages) {
        let page = {};
        // page name
        if (typeof rawPage.name !== 'string') {
          console.warn(`An invalid page detected (in "${CONFIG_PATH}")`, rawPage);
          continue;
        }
        if (rawPage.name.includes('/')) {
          console.warn(`Page name must not include '/' (in "${rawPages.name}")`);
          continue;
        }
        page.name = rawPage.name;
        let target = page.name.replace(/\s+/g, '-').toLowerCase();
        // page indexed
        if (typeof rawPage.indexed === 'boolean') {
          page.indexed = rawPage.indexed;
        }
        else {
          page.indexed = true;
        }
        // page path
        if (typeof rawPage.path === 'string') {
          page.path = rawPage.path;
        }
        else {
          let path = '/' + target;
          try {
            page.path = '.' + new URL(path, baseURL).pathname;
          }
          catch (error) {
            console.error(`Pathname "${path}" for "${page.name} can not be converted into a URL!\n`, error);
            continue;
          }
        }
        let hasChildren = Array.isArray(rawPage.children) && rawPage.children.length > 0;
        // page src
        if (typeof rawPage.src === 'string') {
          page.src = rawPage.src;
        }
        else {
          let src = '/' + target;
          if (!hasChildren) {
            src += '.html';
          }
          try {
            page.src = '.' + new URL(src, baseURL).pathname;
          }
          catch (error) {
            console.error(`Source "${src}" for "${page.name} can not be converted into a URL!\n`, error);
            continue;
          }
        }
        // children recursion
        if (hasChildren) {
          page.children = getPages(baseURL, rawPage.children);
        }
        pages.push(page);
      }
      return pages;
    };
    const getPagesPathname = (rawPathname = getRaw('pagesPathname')) => '/' + this._trimPathname(rawPathname);
    const config = {
      identity: getIdentity(),
      version: getRaw('version'),
      theme: getRaw('theme'),
      routing: {
        baseURL: getBaseURL(),
        pages: getPages(),
        pagesPathname: getPagesPathname(),
      }
    };
    // TODO: modals
    // TODO: and many more...
    return config;
  }
  _provideConfiguration(key, callback) {
    if (typeof key === 'function' && typeof callback === 'undefined') {
      callback = key;
      key = undefined;
    }
    if (typeof callback !== 'function') {
      return;
    }
    if (typeof key === 'undefined') {
      return callback(undefined, this.config);
    }
    if (!this.config.hasOwnProperty(key)) {
      return callback(`Config "${key}" does not exists!`);
    }
    return callback(undefined, this.config[key]);
  }
  _registerListener(key) {
    return event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      let callback;
      console.log(event, key);
      if (typeof event.detail === 'function') {
        callback = event.detail;
      }
      else if (event.detail && typeof event.detail.callback === 'function') {
        callback = event.detail.callback;
      }
      else {
        return;
      }
      if (this.isConfigLoaded) {
        return this._provideConfiguration(key, callback);
      }
      else {
        this.pendingRequests.push({ configKey: key, callback });
      }
    };
  }
}

const defaultCAppRootCss = ":host{display:grid;width:100%;height:100%}:host([layout=vertical]){grid-template-columns:auto 1fr}:host([layout=horizontal]){grid-template-rows:auto 1fr}";

const CAppRoot = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hasSlot = false;
    this.disconnected = false;
    this._createLoader = () => {
      const NR_CIRCLES = 12;
      let circles = "";
      for (let i = 1; i <= NR_CIRCLES; i++) {
        circles += `<div class="sk-circle${i} sk-circle"></div>`;
      }
      let node = document.createElement("div");
      node.className = "app-loader";
      node.innerHTML = `<div class='sk-fading-circle'>${circles}</div>`;
      return node;
    };
  }
  connectedCallback() {
    this.disconnected = false;
  }
  disconnectedCallback() {
    this.disconnected = true;
  }
  async componentWillLoad() {
    if (this.host.parentElement) {
      this.loaderElement = this._createLoader();
      this.host.parentElement.appendChild(this.loaderElement);
    }
    let innerHTML = this.host.innerHTML;
    innerHTML = innerHTML.replace(/\s/g, '');
    if (innerHTML.length) {
      this.hasSlot = true;
    }
    if (typeof this.controller === 'string') {
      try {
        let Controller = await ControllerRegistryService.getController(this.controller);
        // Prevent javascript execution if the node has been removed from DOM
        if (!this.disconnected) {
          new Controller(this.host);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    else {
      // load default controller
      new ApplicationController(this.host);
    }
  }
  async componentDidLoad() {
    console.log('c-app-root loaded!');
    if (this.loaderElement) {
      this.loaderElement.remove();
    }
  }
  render() {
    if (!this.hasSlot) {
      this.host.innerHTML = `
        <c-app-menu></c-app-menu>
        <c-app-container></c-app-container>
      `;
    }
    return h("slot", null);
  }
  get host() { return getElement(this); }
};
injectHistory(CAppRoot);
CAppRoot.style = {
  default: defaultCAppRootCss
};

export { CAppRoot as c_app_root };
