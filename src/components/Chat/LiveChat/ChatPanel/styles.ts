import { css } from "lit";

const styles = css`
  .chat-list-container {
    overflow: auto;
    /* height: calc(100vh - 60px); */
    overflow-wrap: anywhere;
    .date {
      display: flex;
      justify-content: center;
      background: var(--sky-blue);
      margin: 16px 20%;
      padding: 8px 16px;
      border-radius: 4px;
      color: var(--txt-primary-blue);
    }
    .wrapper {
      display: flex;
      margin: 12px;
      .message-conatiner {
        position: relative;
        min-height: 40px;
        width: 60%;
        background: #e5e7ee;
        color: var(--txt-primary-blue);
        padding: 8px 12px;
        border-radius: 4px;
        z-index: -1;
        .time {
          position: absolute;
          bottom: 4px;
          right: 10px;
          color: var(--light-blue);
        }
      }
    }
  }
`;

export default styles;
