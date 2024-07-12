import { html, LitElement } from "lit";

customElements.define(
  "pwa-page-not-found", class PageNotFound extends LitElement {
  render() {
    return html`Oops, page not found!`;
  }
})