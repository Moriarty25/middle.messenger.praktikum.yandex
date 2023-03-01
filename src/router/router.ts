import Block from "../utils/Block";
import Route from "./route";

export default class Router {
  private static __instance: Router;

  private routes!: Route[];

  private history: History | undefined;

  private _currentRoute!: Route | null;

  private readonly _rootQuery!: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, title: string, block: typeof Block) {
    const route = new Route(pathname, title, block, {
      rootQuery: this._rootQuery,
    });

    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event) => {
      if (event.currentTarget) {
        this._onRoute((event.currentTarget as Window).location.pathname);
      }
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      router.go("/404");
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  }

  go(pathname: string) {
    this.history?.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history?.back();
  }

  forward() {
    this.history?.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export const router = new Router("#root");
