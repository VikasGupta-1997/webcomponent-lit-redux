/* eslint-disable lit/no-template-arrow */
import { CSSResultGroup, html, LitElement, css } from "lit";
import { rootStyles } from "@components/shared-styles/styles";
import "./header";
import "./content";
import "./footer";

customElements.define("pwa-live-chat", class ChatType extends LitElement {
  static styles?: CSSResultGroup = [
    rootStyles,
    css`
      .live-chat {
        position: relative;
      }
    `,
  ];

  render() {
    return html` <div class="live-chat">
      <pwa-live-chat-header></pwa-live-chat-header>
      <pwa-live-chat-module></pwa-live-chat-module>
      <pwa-live-chat-footer></pwa-live-chat-footer>
    </div>`;
  }
})