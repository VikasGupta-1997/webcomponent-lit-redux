import { css } from "lit";

const styles = css`
  :host {
    display: block;
  }
  .tab-strip {
    border: 0;
    height: 100%;
  }

  .tab-strip.hide-buttons {
    background-color: red;
    grid-template-rows: 1fr;
  }

  .tab-content {
    height: calC(100vh - 114px);
    overflow-y: hidden;
    /* overflow-y: auto; */
    grid-template-rows: 1fr;
    scroll-snap-type: x mandatory;
    display: flex;
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;
  }

  .tab-content section {
    min-width: 1vw;
    display: block;
    min-width: 100vw;
    height: 100%;
    scroll-snap-align: start;
  }

  .tab-content section > * {
    height: 100%;
    padding: 0.5rem;
  }

  .tab-strip nav {
    display: var(--show-tabs, "");
    justify-content: space-between;
  }

  .tab-strip nav .nav-item {
    color: var(--light-blue);
    border-radius: 3px 3px 0px 3px;
    /* border: 1px solid #f5efef; */
    border-top-width: 1px;
    display: inline-block;
    padding: 5px 3px;
    margin-right: 0.5rem;
  }

  .tab-strip nav .nav-item:link {
    text-decoration: none;
    font-size: 12px;
  }

  .tab-strip nav .nav-item.active {
    border-top-width: 3px;
    display: inline-block;
    /* padding: 3px 3px; */
    border-top-color: orange;
    color: var(--primary-blue);
  }
  .nav-icon {
    font-size: 22px;
  }

  footer {
    border-top: 2px solid var(--skelton-border);
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #f5f5f5;
    padding: 4px 20px;
    text-align: center;
    font-size: 14px;
  }
`;

export default styles;
