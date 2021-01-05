import { r as registerInstance, f as createEvent, h } from './index-f6e31a6c.js';
import { p as promisifyEventEmit } from './index-11527551.js';

const CAppRouter = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.getRoutingConfigEvent = createEvent(this, "cardinal:config:getRouting", 7);
    this.routes = [];
    this.base = '';
    this.root = '';
    this._trimmedPath = (path) => {
      return path.endsWith('/') ? path.slice(0, -1) : path;
    };
    this._renderRoute = ({ path, src }) => {
      const props = {
        url: new URL(path).pathname,
        exact: true,
        component: 'c-app-loader',
        componentProps: {
          src
        }
      };
      return h("stencil-route", Object.assign({ "data-test-url": props.url, "data-test-src": src }, props));
    };
    this._renderRoutes = (routes = [], { path, src } = {
      path: '',
      src: this._trimmedPath(this.base)
    }) => {
      if (!Array.isArray(routes) || routes.length === 0) {
        return null;
      }
      path += '/~dev-route';
      src += '/~dev-source';
      return routes.map(route => {
        const payload = {
          path: this._trimmedPath(new URL(route.path, new URL(path, window.location.origin)).href),
          src: this._trimmedPath(new URL(route.src, new URL(src, window.location.origin)).href)
        };
        if (route.children) {
          return this._renderRoutes(route.children, payload);
        }
        else {
          return this._renderRoute(payload);
        }
      });
    };
  }
  async componentWillLoad() {
    try {
      const routing = await promisifyEventEmit(this.getRoutingConfigEvent);
      this.routes = routing.pages;
      this.root = new URL(routing.baseURL).pathname;
      this.base = new URL(routing.baseURL + routing.pagesPathname).pathname;
    }
    catch (error) {
      console.error(error);
    }
  }
  render() {
    return (h("stencil-router", { "data-test-root": this.root + '/', root: this.root + '/' }, h("stencil-route-switch", { scrollTopOffset: 0 }, this._renderRoutes(this.routes))));
  }
  ;
};

export { CAppRouter as c_app_router };
