import { html, LitElement, css } from "lit";
import { rootStyles } from "@components/shared-styles/styles";
import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import { styleMap } from "lit/directives/style-map.js";

customElements.define("pwa-circular-icon", class CircleIcon extends LitElement {
  static styles = [
    rootStyles,
    css`
      .icon-container {
        border-radius: 50%;
        background: var(--icon-gray);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .active {
        background: var(--primary-blue);
      }
      .white-i {
        color: var(--white);
      }
      .active-i {
        color: var(--primary-blue);
      }
      sl-icon {
        font-size: 20px;
      }
      p {
        color: var(--white);
      }
    `,
  ];
  width: number;
  height: number;
  isLetterIcon: string;
  iconFont: string;
  isActive: boolean;
  icon: string;

  static get properties() {
    return {
      icon: { type: String },
      isActive: { type: Boolean },
      hasSeprator: { type: Boolean },
      iconFont: { type: Number },
      activeIcon: { type: Boolean },
      width: { type: Number },
      height: { type: Number },
      isLetterIcon: { type: String },
    };
  }

  injectStyles() {
    if (this.width)
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
      };
    return {
      width: "42px",
      height: "42px",
    };
  }

  renderIcon() {
    if (this.isLetterIcon) {
      return html` <p>${this.isLetterIcon}</p> `;
    }
    return html`
      <sl-icon
        style=${styleMap({
          fontSize: `${this.iconFont}px`,
        })}
        class=${this.isActive ? "white-i" : "active-i"}
        name=${this.icon}
      ></sl-icon>
    `;
  }

  render() {
    return html`
      <div
        class="icon-container ${this.isActive ? "active" : ""} "
        style=${styleMap(this.injectStyles())}
      >
        ${this.renderIcon()}
      </div>
    `;
  }
})