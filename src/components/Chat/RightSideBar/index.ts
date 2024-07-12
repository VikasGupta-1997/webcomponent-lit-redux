/* eslint-disable lit/no-template-arrow */
import { CSSResultGroup, html, LitElement, css } from "lit";
import { rootStyles } from "@components/shared-styles/styles";
import "./header";

customElements.define("pwa-right-sidebar", class ChatBody extends LitElement {
  static styles?: CSSResultGroup = [rootStyles, css``];

  render() {
    return html`<pwa-right-sidebar-header></pwa-right-sidebar-header> `;
  }
})