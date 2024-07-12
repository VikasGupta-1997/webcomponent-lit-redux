import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { LocationController } from "@utilities/locationController";
import { IRouteMap, Router } from "@utilities/router";
import "@polyfills/polyfillsLoader";
import "@pages/page-chat";
import "@pages/page-not-found";
import "@pages/page-dummy";
import "./registerSW";
import { connect } from "pwa-helpers";
import { store } from "@redux/store";
import { rootStyles } from "@components/shared-styles/styles";
import "@shoelace-style/shoelace/dist/components/select/select.js"
/**
 * Main application
 */

class App extends connect(store)(LitElement) {
  static styles = [rootStyles];
  @property({ type: String })
  name: string;
  locationController: LocationController;
  router: Router;
  @property() cVal: number;

  constructor() {
    super();
    this.locationController = new LocationController(this);

    const routes: IRouteMap = {
      "(chat-page*|/?)": html`<pwa-chat-page></pwa-chat-page>`,
      "page-two?id=:id(\\d+)": (routeData: URLPatternResult) =>
        html`<pwa-page-two
          .pageId=${routeData.search.groups.id}
        ></pwa-page-two>`,
      "page-three(/)?:id(foo|bar)?": (routeData) =>
        html`<pwa-page-three
          .pageId=${routeData.pathname.groups.id}
        ></pwa-page-three>`,
      "dummy-page": () => html`<pwa-page-dummy></pwa-page-dummy>`,
    };
    this.router = new Router(
      routes,
      html`<pwa-page-not-found></pwa-page-not-found>`,
      html`<p>Loading...</p>`
    );
  }

  render() {
    const page = this.router.matchRoute();
    return html` <div>${page}</div> `;
  }
}

customElements.define("pwa-app", App);
