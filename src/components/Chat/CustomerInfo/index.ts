/* eslint-disable lit/no-template-arrow */
import { CSSResultGroup, html, LitElement } from "lit";
import { rootStyles } from "@components/shared-styles/styles";
import { property } from "lit/decorators.js";
import "./header";
import "./content";
class ChatBody extends LitElement {
  static styles?: CSSResultGroup = [
    rootStyles
  ];

  @property() screenWidth: number;

  constructor() {
    super();
    this.screenWidth = window.innerWidth;
    this.handleResize = this.handleResize.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("resize", this.handleResize);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    this.screenWidth = window.innerWidth;
  }

  render() {
    const isLargeScreen = this.screenWidth > 1440;
    return html`<pwa-customer-info-header></pwa-customer-info-header>
      ${isLargeScreen ? html`
      <div class="customer-content">
        <pwa-customer-info-content></pwa-customer-info-content>
      </div>
      `: html``}`;
  }
}

customElements.define("pwa-customer-info", ChatBody )