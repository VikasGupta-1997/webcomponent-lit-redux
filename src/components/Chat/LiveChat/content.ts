import { html, LitElement, css } from "lit";
import { rootStyles } from "@components/shared-styles/styles";
import "./ChatPanel/chat-panel";
import { store } from "@redux/store";
import { connect } from "pwa-helpers";
import { property } from "lit/decorators.js";

class LiveChat extends connect(store)(LitElement) {
  static styles = [
    rootStyles,
    css`
      .content {
        height: calc(100vh - 128px);
        overflow: scroll;
      }
    `,
  ];

  @property({ type: String }) inputValue = "";

  render() {
    return html`<div id="live-chat-messages" class="content">
      <pwa-live-chat-panel></pwa-live-chat-panel>
    </div> `;
  }
}

customElements.define("pwa-live-chat-module", LiveChat);
