import { html, LitElement, css } from "lit";
import { LocationController } from "@utilities/locationController";
import "@shoelace-style/shoelace/dist/components/button/button.js";

customElements.define("pwa-page-dummy",  class PageNotFound extends LitElement {
  locationController: LocationController;
  static styles = css`
    div {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    p {
      margin: 0 16px;
    }
  `;

  constructor() {
    super();
    this.locationController = new LocationController(this);
  }
  render() {
    return html`<div>
      <p>Hello User</p>
      <sl-button @click=${this.goBack} variant="primary">Go Back</sl-button>
    </div> `;
  }
  goBack() {
    this.locationController.goTo("/chat-page");
  }
})