import { html, LitElement } from "lit";
import { connect } from "pwa-helpers";
import { rootStyles } from "@components/shared-styles/styles";
import { store } from "@redux/store";
import { property } from "lit/decorators.js";
import "@components/Chat";

/** Mobile/Tablet Components */
import "@components/Chat/mobile-device-ui/Header/header";
import "@components/Chat/mobile-device-ui/Content/content-body";

class ChatPage extends connect(store)(LitElement) {
  static styles = [rootStyles];

  @property() screenWidth: number;

  constructor() {
    super();
    this.screenWidth = window.innerWidth;
    this.handleResize = this.handleResize.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("resize", this.handleResize);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("resize", this.handleResize);
  }
  
  handleResize(){
    this.screenWidth = window.innerWidth;
  }

  renderChatPage() {
    const isLargeScreen = this.screenWidth > 768;
    if (isLargeScreen) {
      return html`<div class="medium-large-devices">
        <pwa-main-chat></pwa-main-chat>
      </div>`;
    } else {
      return html`
        <div class="small-devices">
          <pwa-chat-mobile-header></pwa-chat-mobile-header>
          <pwa-chat-mobile-body></pwa-chat-mobile-body>
        </div>
      `;
    }
  }

  render() {
    return html` <main>${this.renderChatPage()}</main> `;
  }
}

customElements.define("pwa-chat-page", ChatPage);
