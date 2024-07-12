import { html, LitElement, css } from "lit";
import { rootStyles } from "@components/shared-styles/styles";
import { property } from "lit/decorators.js";

import "./header";
import "@components/Common/badge";
import popupBoxStyles from '@components/shared-styles/popup-box-styles'

class GPTLargeScreen extends LitElement {
  static styles = [
    rootStyles,
    popupBoxStyles,
    css`
      .blinker {
        width: 50%;
        padding: 8px;
        margin: 8px;
        background: lightblue;
        border-radius: 12px;
        .p {
          margin-bottom: 12px;
        }
      }
      .badge {
        padding: 24px;
      }
    `,
  ];

  @property({ type: Boolean })
  isNotificationTrayOpen = false;

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
     <div class="blinker" >
        <p class="p" >Notification Blink Badge</p>
        <pwa-badge variant="primary" pill pulse>1</pwa-badge>
        </div>
      </div>
      <div class="badge">
        <pwa-notification-tray
              .isNotificationTrayOpen=${this.isNotificationTrayOpen}
            >
              <span id="anchor-slot" slot="anchor-part">
                <pwa-badge variant="primary"  @click=${this.handleClick}>Badge</pwa-badge>
              </span>
              <span id="content-slot" slot="popup-content">
                <div class="box">
                  <pwa-search-input
                    placeholder="Marc losain"
                  ></pwa-search-input>
                  <div class="user-info-container">
                    <sl-button size="small" class="link-btn" pill
                      >chat duplicate</sl-button
                    >
                  </div>
                </div>
              </span>
            </pwa-notification-tray>

      </div>`;
  }
}

customElements.define("pwa-chat-body", GPTLargeScreen);
