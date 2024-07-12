import { html, LitElement, css } from "lit";
import "@components/Common/circular-icons";
import { rootStyles } from "@components/shared-styles/styles";
import { LocationController } from "@utilities/locationController";
import "@shoelace-style/shoelace/dist/components/alert/alert.js"
import notify from "@utilities/toast";

customElements.define("pwa-chat-type-content", class ChatTypeHead extends LitElement {
  static styles = [rootStyles, css`
    .type-body {
      text-align:center;
    }
    .btn-suffix{
      position: absolute;
      top: 0px;
      right: 0px;
      translate: 50% -50%;
      pointer-events: none;
    }
  `];

  locationController: LocationController;
  list: {
    icon: string;
  }[];

  constructor() {
    super();
    this.locationController = new LocationController(this);
  }

  render() {
    return html`
      <div class="type-body">
        <sl-button
         @click=${() => this.locationController.goTo("/dummy-page")}
          style="margin-top:16px"
          variant="primary"
          >Go To Page</sl-button
        >
        <sl-button
         @click=${this.showToast}
          style="margin-top:16px"
          variant="danger"
          >
          Open  Toast
          <div class="btn-suffix" slot="suffix">
            <pwa-badge pill>30</pwa-badge>
          </div>
          </sl-button
        >
       
    `;
  }
  showToast(){
    notify(`This is custom toast`, "danger");
  }
})