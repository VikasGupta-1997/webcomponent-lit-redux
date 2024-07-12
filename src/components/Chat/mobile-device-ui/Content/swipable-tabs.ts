import { html, LitElement } from "lit";
import "@shoelace-style/shoelace/dist/components/input/input.js";
import { rootStyles } from "@components/shared-styles/styles";
import { repeat } from "lit/directives/repeat.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import styles from "./swipable.styles";

class ChatMobileBody extends LitElement {
  static styles = [rootStyles, styles];

  _hideButtons = false;
  list: {
    id: string;
    name: string;
    content: string;
    active: boolean;
    icon: string;
  }[];

  static get properties() {
    return {
      hideButtons: { type: Boolean, attribute: "hide-buttons" },
    };
  }

  /**
   * Gets a boolean indicating to hide the tab buttons.
   */
  get hideButtons() {
    return this._hideButtons;
  }

  /**
   * Hides the buttons of the tabstrip.
   */
  set hideButtons(value) {
    this._hideButtons = value;
  }

  constructor() {
    super();
    this.list = [...this.querySelectorAll("pwa-swipetab")].map((i) => {
      return {
        id: i.getAttribute("id"),
        name: i.getAttribute("name"),
        content: i.innerHTML,
        active: i.getAttribute("active") != null,
        icon: i.className,
      };
    });
  }

  // render tab buttons based on this.list
  renderTabButtons() {
    return html`
      ${repeat(
        this.list,
        (item) => item.id,
        (item) => {
          return html`<div 
            @click=${this.clickTab}
           id=${`${item.id}`} class="nav-item ${item.active ? "active" : ""}">
            <sl-icon class="nav-icon" name=${item.icon}></sl-icon>
            <p>${item.name}</div>
          </a>`;
        }
      )}
    `;
  }

  // render tabs based on this.list
  renderTabs() {
    return html`
      ${repeat(
        this.list,
        (item) => item.id,
        (item) => {
          return html`<section id="${item.id}">
            ${unsafeHTML(item.content)}
          </section>`;
        }
      )}
    `;
  }

  render() {
    return html` <div
      class="tab-strip ${this.hideButtons ? "hide-buttons" : ""}"
      style="--show-tabs: ${this.hideButtons ? "none" : "flex"}"
    >
      <div class="tab-content" @scroll=${this.scrollContent}>
        ${this.renderTabs()}
      </div>
      <footer>
        <nav>${this.renderTabButtons()}</nav>
      </footer>
    </div>`;
  }

  // handle tab clicks - smooth scroll
  clickTab(e: MouseEvent) {
    this.shadowRoot
      .getElementById((e.currentTarget as HTMLElement)?.id)
      ?.scrollIntoView({
        block: "start",
        inline: "start",
        behavior: "smooth",
      });
  }

  scrollContent(e: MouseEvent) {
    const container = (e.target as HTMLElement)?.closest(".tab-content");
    const buttons = (e.target as HTMLElement)
      ?.closest(".tab-strip")
      .querySelectorAll("nav div");
    const scrollLeft = container.scrollLeft;
    const activeIndex = Math.round(
      scrollLeft / (container as HTMLElement)?.offsetWidth
    );
    const btn = buttons[activeIndex];
    buttons.forEach((b) => {
      b.classList.toggle("active", btn == b);
    });
  }
}

customElements.define("pwa-swipetabs", ChatMobileBody);
