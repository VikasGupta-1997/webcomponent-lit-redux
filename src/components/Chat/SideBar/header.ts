/* eslint-disable lit/no-template-arrow */
import { CSSResultGroup, html, LitElement, css } from "lit";
import { rootStyles } from "@components/shared-styles/styles";

customElements.define("pwa-sidebar-header", class ChatBody extends LitElement {
  static styles?: CSSResultGroup = [
    rootStyles,
    css`
      .chat-gpt-header-container-sm {
        display: none;
      }
      header {
        height: 60px;
        /* display: grid;
        grid-template-columns: 72px 0.8fr 2.2fr 2.2fr 1.4fr 72px;
        background: var(--primary-gray); */
        .logo {
          position: relative;
          width: 72px;
          background: linear-gradient(
            33.17deg,
            #1509ff -26.91%,
            #8203a1 100.14%
          );
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 8px;
          .oval-container {
            width: 52px;
            height: 42px;
            background: var(--white);
            border-radius: 72px / 51px;
            display: flex;
            align-items: center;
            justify-content: center;
            .my-icon {
              font-size: 32px;
              color: blue;
            }
          }
        }
        .customer-info-small-desktop {
          display: none;
        }
        .right-bar-haed {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      div {
        /* border-right: 1px solid var(--skelton-border); */
      }

      @media screen and (max-width: 1440px) {
        header {
          /* grid-template-columns: 72px 0.8fr 2.2fr 2.2fr 0.3fr 72px; */
          .live-chat-header-container {
            border-right: none;
          }
          .customer-info-large-desktop {
            display: none;
          }
          .customer-info-small-desktop {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }

      @media screen and (max-width: 1024px) {
        header {
          grid-template-columns: 72px 0.8fr 0.3fr 2.2fr 0.3fr 72px;
          .chat-gpt-header-container-lg {
            display: none;
          }
          .chat-gpt-header-container-sm {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    `,
  ];

  render() {
    return html`
      <header>
        <div class="logo">
          <img src="/images/Bconnect_logo.png" />
        </div>
      </header>
    `;
  }
})