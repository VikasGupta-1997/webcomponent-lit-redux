import { html, LitElement, css } from "lit";
import "@shoelace-style/shoelace/dist/components/dialog/dialog.js";
import { rootStyles } from "@components/shared-styles/styles";

customElements.define("pwa-dialog", class SearchInput extends LitElement {
  static styles = [
    rootStyles,
    css``
  ];
  isActive: boolean;


  render() {
    return html`
    <sl-dialog label="Dialog" class="dialog-overview">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <sl-button slot="footer" variant="primary">Close</sl-button>
    </sl-dialog>
    `;
  }
})