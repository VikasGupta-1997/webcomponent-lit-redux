import { html, LitElement } from "lit";
import "@components/Common/circular-icons";
import "@components/Common/search-bar";
import { rootStyles } from "@components/shared-styles/styles";
import { gptNavigationData } from "@utilities/gptHeaderNav";
import styles from "./header.styles";
import { repeat } from "lit/directives/repeat.js";
import '@components/Common/Dialog'

customElements.define("pwa-chat-gpt-header", class ChatGptHead extends LitElement {
  static styles = [rootStyles, styles];

  static get properties() {
    return {
      activeIcon: { type: Number },
    };
  }
  activeIcon = 0;

  renderIconSeries() {
    return html` ${repeat(gptNavigationData, (item, index) => {
      return html`
        <pwa-circular-icon
          class="gpt-head-icons"
          width=${30}
          height=${30}
          iconFont=${12}
          .isActive=${this.activeIcon === index}
          icon=${item.icons}
          @click=${() => this.handleIconClick(index)}
        >
        </pwa-circular-icon>
        <pwa-dialog id="modal-${index}" ></pwa-dialog>
      `;
    })}`;
  }

  handleIconClick(index: number){
    this.activeIcon = index
    const modal = this.shadowRoot.querySelector("pwa-dialog")
    const slDialog = modal.shadowRoot.querySelector('sl-dialog')
    slDialog.show()
  }

  render() {
    return html`
      <header>
        <div class="gpt-head-container">
          <div class="left-icons-container">
            <pwa-circular-icon
              width=${30}
              height=${30}
              iconFont=${12}
              activeIcon=${true}
              icon=${"arrow-return-left"}
            >
            </pwa-circular-icon>
          </div>
          <div class="search-input">
            <pwa-search-input showSuffix></pwa-search-input>
          </div>
          <div class="icon-container">${this.renderIconSeries()}</div>
        </div>
      </header>
    `;
  }
})