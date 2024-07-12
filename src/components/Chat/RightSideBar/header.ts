/* eslint-disable lit/no-template-arrow */
import { CSSResultGroup, html, LitElement, css } from "lit";
import { rootStyles } from "@components/shared-styles/styles";

customElements.define("pwa-right-sidebar-header",  class ChatBody extends LitElement {
  static styles?: CSSResultGroup = [
    rootStyles,
    css`
      .right-bar-haed {
        height: 60px;
        background: var(--primary-gray);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ];

  render() {
    return html` <header class="right-bar-haed">
      <pwa-circular-icon icon=${"search"}> </pwa-circular-icon>
    </header>`;
  }
})