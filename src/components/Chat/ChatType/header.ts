import { html, LitElement, css } from "lit";
import "@components/Common/circular-icons";
import { rootStyles } from "@components/shared-styles/styles";

customElements.define("pwa-chat-type-header",  class ChatTypeHead extends LitElement {
  static styles = [
    rootStyles,
    css`
      header {
        height: 60px;
        background: var(--primary-gray);
        .chat-type-head-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          padding: 14px 12px;
        }
        p {
          font-size: 16px;
          font-weight: 700;
          color: var(--txt-primary-blue);
          line-height: 23px;
        }
      }
    `,
  ];

  render() {
    return html`
      <header>
        <div class="chat-type-head-container">
          <p>Chats</p>
          <pwa-circular-icon
            width=${30}
            height=${30}
            iconFont=${12}
            activeIcon=${true}
            icon=${"plus-square"}
          >
          </pwa-circular-icon>
        </div>
      </header>
    `;
  }
})