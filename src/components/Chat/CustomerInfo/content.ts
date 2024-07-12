import { html, LitElement, css } from "lit";
import { rootStyles } from "@components/shared-styles/styles";

customElements.define("pwa-customer-info-content", class CustomerInfo extends LitElement {
  static styles = [rootStyles, css``];

  render() {
    return html` Hello `;
  }
})