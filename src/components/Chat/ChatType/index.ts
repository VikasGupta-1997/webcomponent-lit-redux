/* eslint-disable lit/no-template-arrow */
import { CSSResultGroup, html, LitElement, css } from "lit";
import { rootStyles } from "@components/shared-styles/styles";
import "./header";
import "./content";

customElements.define("pwa-chat-types", class ChatType extends LitElement {
  static styles?: CSSResultGroup = [rootStyles, css``];

  render() {
    return html`<pwa-chat-type-header></pwa-chat-type-header>
      <pwa-chat-type-content></pwa-chat-type-content> `;
  }
})