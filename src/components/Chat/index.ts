/* eslint-disable lit/no-template-arrow */
import { CSSResultGroup, html, LitElement, css } from "lit";
import { rootStyles } from "@components/shared-styles/styles";
import "./SideBar";
import "./ChatType";
import "./ChatGpt";
import "./LiveChat";
import "./CustomerInfo";
import "./RightSideBar";
import styles from "./styles";
customElements.define("pwa-main-chat", class ChatBody extends LitElement {
  static styles?: CSSResultGroup = [rootStyles, styles];

  render() {
    return html`
      <section>
        <div class="section-1"><pwa-chat-sidebar></pwa-chat-sidebar></div>
        <div class="section-2"><pwa-chat-types></pwa-chat-types></div>
        <div class="section-3"><pwa-chat-gpt></pwa-chat-gpt></div>
        <div class="section-4"><pwa-live-chat></pwa-live-chat></div>
        <div class="section-5">
          <pwa-customer-info></pwa-customer-info>
        </div>
        <div class="section-6"><pwa-right-sidebar></pwa-right-sidebar></div>
      </section>
    `;
  }
})