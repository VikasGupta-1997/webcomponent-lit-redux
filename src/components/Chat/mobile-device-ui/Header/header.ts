import { html, LitElement, css } from "lit";
import "@shoelace-style/shoelace/dist/components/input/input.js";
import { rootStyles } from "@components/shared-styles/styles";
import styles from "./styles";

customElements.define("pwa-chat-mobile-header", class ChatMobileHeader extends LitElement {
  static styles = [rootStyles, styles];

  render() {
    return html`
      <header>
        <div class="first-row">
          <p class="status">Online</p>
          <h3>Chats</h3>
          <div class="icon">
            <sl-icon class="my-icon" name="plus-square"></sl-icon>
          </div>
        </div>
        <div class="search">
          <sl-input class="input" placeholder="Search chats" size="small">
            <sl-icon class="prefix-icon" name="search" slot="prefix"></sl-icon>
          </sl-input>
        </div>
      </header>
    `;
  }
})