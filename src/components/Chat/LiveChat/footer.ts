import { html, LitElement } from "lit";
import { rootStyles } from "@components/shared-styles/styles";
import "./ChatPanel/chat-panel";
import { store } from "@redux/store";
import { addMessage } from "@redux/messageReducer";
import { connect } from "pwa-helpers";
import styles from "./footer.styles";
import { property } from "lit/decorators.js";

class LiveChat extends connect(store)(LitElement) {
  static styles = [rootStyles, styles];

  @property({ type: String }) inputValue = "";

  render() {
    return html`
      <div class="footer">
        <footer class="footer">
          <form @submit=${this.handleSent} class="inline-validation">
            <sl-input
              placeholder="Type your message here..."
              class="input-pill"
              size="large"
              pill
              value=${this.inputValue}
              @input=${this.handleInputChange}
            >
              <div class="paperclip-container" slot="suffix">
                <sl-icon
                  class="paperclip"
                  name="paperclip"
                  slot="suffix"
                ></sl-icon>
              </div>
              <div class="paperclip-container" slot="suffix">
                <sl-icon
                  class="paperclip"
                  name="emoji-smile"
                  slot="suffix"
                ></sl-icon>
              </div>
              <div
                @click="${this.handleSent}"
                class="send-container"
                slot="suffix"
              >
                <sl-icon class="send" name="send" slot="suffix"></sl-icon>
              </div>
            </sl-input>
          </form>
        </footer>
      </div>
    `;
  }

  handleInputChange(event: MouseEvent) {
    const inputElement = event.target as HTMLInputElement;
    this.inputValue = inputElement.value;
  }

  handleSent(event: MouseEvent) {
    event.preventDefault();
    if (this.inputValue?.trim()?.length < 1) return;
    store.dispatch(
      addMessage({
        message: this.inputValue,
        timeStamp: new Date().toISOString(),
      })
    );
    this.inputValue = "";
  }
}

customElements.define("pwa-live-chat-footer", LiveChat);
