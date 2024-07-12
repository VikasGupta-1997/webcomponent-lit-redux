import { html, LitElement, css } from "lit";
import "./circular-icons";
import "@shoelace-style/shoelace/dist/components/input/input.js";
import { rootStyles } from "@components/shared-styles/styles";
import {property} from 'lit/decorators.js'

class SearchInput extends LitElement {
  static styles = [
    rootStyles,
    css`
      .search-container {
      }

      .prefix-icon {
        padding-left: 10px;
        color: var(--primary-blue);
      }
      .suffix-icon {
        padding-right: 10px;
        color: var(--primary-blue);
      }
    `,
  ];
  @property({type: Boolean}) showSuffix = false
  @property({type: String}) placeholder = 'Search...'

  render() {
    return html`
      <div class="search-container">
        <sl-input placeholder=${this.placeholder} size="small" pill>
          <sl-icon class="prefix-icon" name="search" slot="prefix"></sl-icon>
          ${this.showSuffix ? html`<sl-icon class="suffix-icon" name="sliders" slot="suffix"></sl-icon>` : ''}
        </sl-input>
      </div>
    `;
  }
}
customElements.define("pwa-search-input", SearchInput)