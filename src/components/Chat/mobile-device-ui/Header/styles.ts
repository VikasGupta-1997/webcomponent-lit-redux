import { css } from "lit";

const styles = css`
  header {
    .first-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      .status {
        width: 42px;
        height: 16px;
        color: var(--white);
        background: var(--success-green);
        padding: 2px 6px;
        font-size: var(--mobile-font-small);
        border-radius: 4px;
      }
      .icon {
        .my-icon {
          color: var(--primary-blue);
        }
      }
    }
    .search {
      padding: 0px 24px;
      ::part(base) {
        border-radius: 10px;
        height: 44px;
        align-items: center;
        font-size: 18px;
        background: var(--primary-gray);
      }
      .prefix-icon {
        padding-left: 10px;
        color: var(--dark-gray);
        font-size: 24px;
      }
    }
  }
`;
export default styles;
