import { html, LitElement, css } from "lit";
import "@shoelace-style/shoelace/dist/components/input/input.js";
import { rootStyles } from "@components/shared-styles/styles";
import "./swipable-tabs";
import "./Chats/chat";

customElements.define("pwa-chat-mobile-body",  class ChatMobileBody extends LitElement {
  static styles = [
    rootStyles,
    css`
      .chat-body {
        .chat-type {
          display: flex;
          justify-content: space-between;
          padding: 8px 24px;
          font-size: 12px;
          color: var(--dark-blue);
          border-bottom: 1px solid var(--skelton-border);
        }
        .chat-tab {
          padding: 10px 12px;
        }
      }
    `,
  ];

  render() {
    return html`
      <div class="chat-body">
        <div class="chat-type">
          <p>List</p>
          <p>Archive</p>
        </div>
        <pwa-swipetabs>
          <pwa-swipetab active id="tab1" name="Chats" class="chat-square-text">
            <div class="chat-tab">
              <pwa-mobile-chat-tab></pwa-mobile-chat-tab>
            </div>
          </pwa-swipetab>
          <pwa-swipetab id="tab2" name="Contacts" class="journal-medical">
            <div>Tab 2 contents</div>
          </pwa-swipetab>
          <pwa-swipetab id="tab3" name="Users" class="people">
            <div>Tab 3 contents!!!!</div>
          </pwa-swipetab>
          <pwa-swipetab id="tab4" name="Settings" class="gear">
            <div>Tab 4 contents!!!!</div>
          </pwa-swipetab>
        </pwa-swipetabs>
      </div>
    `;
  }
})