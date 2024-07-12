import { css } from "lit";

const styles = css`
  .footer {
    width: 100%;
    padding: 0 8px;
    ::part(base) {
      height: 60px;
      display: flex;
      align-items: center;
      font-size: 14px;
    }
    .paperclip-container {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: var(--primary-blue);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 8px;
      padding: 8px;
      .paperclip {
        font-size: 24px;
        color: var(--white);
      }
    }
    .send-container {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--primary-blue);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 8px;
      padding: 12px;
      .send {
        font-size: 36px;
        color: var(--white);
      }
    }
  }
  sl-icon {
    cursor: pointer;
  }
`;
export default styles;
