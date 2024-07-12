import { html, LitElement, css } from "lit";
import { rootStyles } from "@components/shared-styles/styles";
import "./header";
import './chat-body'

customElements.define("pwa-chat-gpt-lg-desktop",class GPTLargeScreen extends LitElement {
  static styles = [rootStyles, css``];

  render() {
    return html`
      <pwa-chat-gpt-header></pwa-chat-gpt-header>
      <pwa-chat-body></pwa-chat-body>
      `;
  }
})
