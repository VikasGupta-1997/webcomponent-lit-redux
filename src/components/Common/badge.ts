import { html, LitElement, css } from "lit";
import { rootStyles } from "@components/shared-styles/styles";
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import { property } from "lit/decorators.js";

class Badge extends LitElement {
  static styles = [
    rootStyles,
    css``
  ];

  @property({ type: Boolean }) pill = false;
  @property({ type: Boolean }) pulse = false;
  @property({ type: String }) variant = 'primary';

  render() {
    return html`
      <sl-badge
        ?pill=${this.pill}
        ?pulse=${this.pulse}
        variant=${this.variant}
      >
        <slot></slot>
      </sl-badge>
    `;
  }
}

customElements.define("pwa-badge", Badge);