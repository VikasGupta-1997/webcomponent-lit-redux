import { html, LitElement, css } from "lit";
import "@components/Common/circular-icons";
import "@components/Common/search-bar";
import { rootStyles } from "@components/shared-styles/styles";
import { customerInfoHeader } from "@utilities/customer-info-header-nav";
import { repeat } from "lit/directives/repeat.js";

customElements.define("pwa-customer-info-header", class CustomerInfo extends LitElement {
  static styles = [
    rootStyles,
    css`
      header {
        height: 60px;
        background: var(--primary-gray);
        .customer-info-head-container {
          display: flex;
          align-items: center;
          height: 100%;
          justify-content: end;
          gap: 8px;
          padding: 14px 12px;
        }
      }
      @media screen and (max-width: 1440px) {
        header {
          height: 100%;
          display: flex;
          .customer-info-head-container {
            display: inline-block;
            margin: 0 auto;
            .icon-container {
              margin: 16px 0;
            }
            .icon-container:first-child {
              margin-top: 0;
            }
          }
        }
      }
    `,
  ];

  renderMenu() {
    return html` ${repeat(customerInfoHeader, (item) => {
      return html`
        <div class="icon-container">
          <pwa-circular-icon
            width=${40}
            height=${40}
            iconFont=${18}
            icon=${item.icons}
          >
          </pwa-circular-icon>
        </div>
      `;
    })}`;
  }

  render() {
    return html`
      <header>
        <div class="customer-info-head-container">${this.renderMenu()}</div>
      </header>
    `;
  }
})