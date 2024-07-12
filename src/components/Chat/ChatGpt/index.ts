import { html, LitElement, css } from "lit";
import "@components/Common/circular-icons";
import { rootStyles } from "@components/shared-styles/styles";
import "./LargeDesktop/header";
import "./LargeDesktop/chat-gpt-large-desktop";
import "./SmallDesktop/chat-gpt-small-desktop";
import { property } from "lit/decorators.js";

class ChatTypeHead extends LitElement {
  static styles = [rootStyles, css`
  .small-desktop {
    display: flex;
    justify-content: center;
    background: var(--primary-gray);
    height: 100%;
  }
  `];

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

  handleResize() {
    this.screenWidth = window.innerWidth;
  }

  render() {
    const isLargeScreen = this.screenWidth > 1024;

    return html`${isLargeScreen
      ? html`
          <div class="large-desktop">
            <pwa-chat-gpt-lg-desktop></pwa-chat-gpt-lg-desktop>
          </div>
        `
      : html`
          <div class="small-desktop">
            <pwa-chat-gpt-sm-desktop></pwa-chat-gpt-sm-desktop>
          </div>
        `}`;
  }
}
customElements.define("pwa-chat-gpt", ChatTypeHead);
