import { html, LitElement, css } from "lit";
import { rootStyles } from "@components/shared-styles/styles";
import { navigationData } from "@utilities/nav-data";
import "@shoelace-style/shoelace/dist/components/divider/divider.js";
import "@shoelace-style/shoelace/dist/components/divider/divider.js";
import "@components/Common/circular-icons";
import { repeat } from "lit/directives/repeat.js";

class NavBar extends LitElement {
  static styles = [
    rootStyles,
    css`
      li {
        padding: 16px;
      }
      p {
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    `,
  ];

  static get properties() {
    return {
      activeIcon: { type: Number },
    };
  }
  activeIcon = 0;

  renderNavItems() {
    return html`
      ${repeat(navigationData, (item, index) => {
        return html`
          <li>
            <p class="style-me">
              <pwa-circular-icon
                .isActive=${this.activeIcon === index}
                icon=${item.icons}
                @click=${() => (this.activeIcon = index)}
              >
              </pwa-circular-icon>
            </p>
          </li>
          ${item.hasSeprator ? html`<sl-divider></sl-divider>` : null}
        `;
      })}
    `;
  }

  render() {
    return html`
      <nav>
        <ul>
          ${this.renderNavItems()}
        </ul>
      </nav>
    `;
  }
}

customElements.define("pwa-nav", NavBar);
