import { html, LitElement, css } from "lit";
import { property } from "lit/decorators.js";
import { rootStyles } from "@components/shared-styles/styles";
import "./name-capsule";
import "@components/Common/search-bar";
import "@components/Common/notification-tray";
import popupBoxStyles from '@components/shared-styles/popup-box-styles'

class LiveChatPage extends LitElement {
  static styles = [
    rootStyles,
    popupBoxStyles,
    css`
      header {
        height: 60px;
        background: var(--primary-gray);
        .chat-live-head-container {
          padding: 14px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }
        .left-side {
          display: flex;
          gap: 12px;
        }
        .anchot-slot {
          cursor: pointer
        }
      }
    `,
  ];
  @property({}) user = "Derek Bulthuis";
  @property({ type: Boolean })
  isNotificationTrayOpen = false;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("click", this.handleDomClick.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("click", this.handleDomClick.bind(this));
  }

  handleDomClick(event: any) {
    const anchorElement = this.shadowRoot.getElementById("anchor-slot");
    const popupContentElement = this.shadowRoot.getElementById("content-slot");
    if (
      !event.composedPath().includes(anchorElement) &&
      !event.composedPath().includes(popupContentElement)
    ) {
      this.isNotificationTrayOpen = false;
    }
  }

  handleClick() {
    this.isNotificationTrayOpen = !this.isNotificationTrayOpen;
  }

  render() {
    return html`
      <header>
        <div class="chat-live-head-container">
          <p>${this.user} - Bconnectlivechat.nl</p>
          <div class="left-side">
            <pwa-name-capsule></pwa-name-capsule>
            <pwa-notification-tray
              .isNotificationTrayOpen=${this.isNotificationTrayOpen}
            >
              <span class="anchot-slot" id="anchor-slot" slot="anchor-part">
                <pwa-circular-icon
                  @click=${this.handleClick}
                  width=${32}
                  height=${32}
                  icon=${"link-45deg"}
                >
                </pwa-circular-icon>
              </span>
              <span id="content-slot" slot="popup-content">
                <div class="box">
                  <pwa-search-input
                    placeholder="Aaron Scott"
                  ></pwa-search-input>
                  <div class="user-info-container">
                    <sl-button size="small" class="link-btn" pill
                      >link chat</sl-button
                    >
                  </div>
                </div>
              </span>
            </pwa-notification-tray>
          </div>
        </div>
      </header>
    `;
  }
}

customElements.define("pwa-live-chat-header", LiveChatPage);
