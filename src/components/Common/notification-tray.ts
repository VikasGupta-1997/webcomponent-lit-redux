import { html, LitElement, css, noChange, nothing } from "lit";
import { rootStyles } from "@components/shared-styles/styles";
import { property } from "lit/decorators.js";
class NotificationTray extends LitElement {
  static styles = [
    rootStyles,
    css`
      .popup-overview sl-popup {
        --arrow-color: var(--white);
      }
    `,
  ];

  @property({ type: Boolean }) isNotificationTrayOpen = false;
  
  render() {
    return html`
      <span id="external-anchor">
        <slot name="anchor-part"></slot>
      </span>
      <div class="popup-overview">
        <sl-popup
          class="popup"
          anchor="external-anchor"
          flip
          distance="10"
          placement="bottom"
          ?active=${this.isNotificationTrayOpen}
          arrow
        >
            <slot name="popup-content"></slot>
        </sl-popup>
      </div>
    `;
  }
}

customElements.define("pwa-notification-tray", NotificationTray);
