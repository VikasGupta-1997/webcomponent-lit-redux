import { html, LitElement, css } from "lit";
import { rootStyles } from "@components/shared-styles/styles";
import { chatMessages } from "@utilities/dummy-chats";
import styles from "./styles";
import { repeat } from "lit/directives/repeat.js";
import "@shoelace-style/shoelace/dist/components/badge/badge.js"

customElements.define("pwa-mobile-chat-tab",class ChatTab extends LitElement {
  static styles = [rootStyles, styles];

  renderChats() {
    return html`
      ${repeat(chatMessages, (item) => {
        return html`
          <div class="message">
            <div class="icon-container">
              <sl-icon class="whatsapp-icon" name="whatsapp"></sl-icon>
            </div>
            <div class="message-info">
              <div class="top-content">
                <div class="user-name">
                  <h3 class="h3">${item.userName}</h3>
                  <sl-badge variant="primary" pill>Primary</sl-badge>
                </div>
                <small>${item.dateTime}</small>
              </div>
              <div class="right-side">
                <span
                  class=${item.doubleTick ? "double-tick" : "single-tick"}
                ></span>
                <p>${item.message}</p>
              </div>
            </div>
          </div>
        `;
      })}
    `;
  }

  render() {
    return html` <div>${this.renderChats()}</div> `;
  }
})