/* eslint-disable lit/no-template-arrow */
import { CSSResultGroup, html, LitElement, css } from "lit";
import { rootStyles } from "@components/shared-styles/styles";
import "./header";
import "./nav-bar";

customElements.define("pwa-chat-sidebar", class ChatBody extends LitElement {
  static styles?: CSSResultGroup = [rootStyles];

  render() {
    return html`
      <pwa-sidebar-header></pwa-sidebar-header>
      <pwa-nav></pwa-nav>
    `;
  }
})