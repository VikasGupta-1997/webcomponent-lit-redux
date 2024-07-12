import { html, LitElement, css } from "lit";
import { rootStyles } from "@components/shared-styles/styles";
import { store } from "@redux/store";
import { connect } from "pwa-helpers";
import { property } from "lit/decorators.js";
import { Message } from "@type/chat";
import { repeat } from "lit/directives/repeat.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "./styles";

class ChatPanel extends connect(store)(LitElement) {
  static styles = [rootStyles, styles];

  @property() messages: Message[] = [];
  @property() lastMessageRef: HTMLElement | null = null;

  updated() {
    const lastMessage = this.shadowRoot.querySelector("#last-message");
    if (lastMessage) {
      lastMessage.scrollIntoView();
    }
  }

  stateChanged({ message }: any) {
    this.messages = message.messages || [];
  }

  getFormattedDate(cDate: any) {
    const date = new Date(cDate);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    return formattedTime;
  }

  renderMessageList() {
    return html`
      ${repeat(this.messages, (message, index) => {
        const messageStyle = {
          justifyContent: index % 2 === 0 ? "start" : "end",
        };
        return html`
          <div
            id=${index === this.messages.length - 1
              ? "last-message"
              : "wrapper-${index}"}
            class="wrapper"
            style=${styleMap(messageStyle)}
          >
            <div class="message-conatiner">
              <p>${message.message}</p>
              <small class="time"
                >${this.getFormattedDate(message.timeStamp)}</small
              >
            </div>
          </div>
        `;
      })}
    `;
  }

  render() {
    return html`
      <div class="chat-list-container">
        <p class="date">
          ${new Date().toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </p>
        ${this.renderMessageList()}
      </div>
    `;
  }
}

customElements.define("pwa-live-chat-panel", ChatPanel);
