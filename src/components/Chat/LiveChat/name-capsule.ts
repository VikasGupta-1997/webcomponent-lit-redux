import { html, LitElement, css } from "lit";
import { property } from "lit/decorators.js";

class NameCapsule extends LitElement {
  static styles = [
    css`
    .capsule{
      width: 94px;
      height: 32px;
      background: #7979A1;
      border-radius: 24px;
      display: flex;
      align-items: center;
      gap: 6px;
    } 
    p{
      color: var(--white);
      font-size: 12px;
      font-weight: 500;
      line-height: 16px
    }
    }
  `,
  ];
  @property({}) user = "Derek Bulthuis";

  static get properties() {
    return {
      user: { type: String },
    };
  }

  render() {
    return html`
      <div class="capsule">
        <pwa-circular-icon
          width=${32}
          height=${32}
          isActive=${true}
          isLetterIcon=${"P"}
        >
        </pwa-circular-icon>
        <p>Patrick</p>
      </div>
    `;
  }
}

customElements.define("pwa-name-capsule", NameCapsule);
