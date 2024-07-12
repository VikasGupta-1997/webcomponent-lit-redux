import { css } from "lit";
const styles = css`
  .message {
    display: grid;
    grid-template-columns: 1fr 10fr;
    gap: 16px;
    padding: 6px 0;
    .icon-container {
      margin-top: 4px;
      height: 36px;
      width: 36px;
      background: var(--icon-gray);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      .whatsapp-icon {
        font-size: 20px;
      }
    }
    .message-info {
      border-bottom: 2px solid var(--skelton-border);
      padding: 4px 0;

      .h3 {
        font-size: 14px;
      }
      .top-content {
        display: flex;
        justify-content: space-between;
        .user-name {
          display: flex;
          align-items: center;
          gap: 20px;
        }
      }
      .right-side {
        display: flex;
        gap: 8px;
      }
    }
  }
  .double-tick::before {
    content: "\\2714 \\2714";
    font-size: 12px;
  }
  .single-tick::before {
    content: "\\2714";
    font-size: 12px;
  }
`;

export default styles;
