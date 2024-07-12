import { html, LitElement, css } from "lit";
import { rootStyles } from "@components/shared-styles/styles";
import { gptSm } from "@utilities/gpt-small-screen-data";
import { repeat } from "lit/directives/repeat.js";

customElements.define("pwa-chat-gpt-sm-desktop", class GPTSmallScreen extends LitElement {
  static styles = [
    rootStyles,
    css`
      .single-item {
        padding: 12px 0;
      }
    `,
  ];

  renderGPTSmallNav() {
    return html`
      ${repeat(gptSm, (item) => {
        return html`
          <div class="single-item">
            <pwa-circular-icon icon=${item.icon}> </pwa-circular-icon>
          </div>
        `;
      })}
    `;
  }

  render() {
    return this.renderGPTSmallNav();
  }
})