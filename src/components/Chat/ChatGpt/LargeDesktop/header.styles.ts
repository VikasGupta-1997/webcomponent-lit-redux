import { css } from "lit";
const styles = css`
  header {
    height: 60px;
    background: var(--primary-gray);
    .gpt-head-container {
      height: 100%;
      padding-top: 14px;
      padding-bottom: 14px;
      display: grid;
      grid-template-columns: 10% 35% 55%;
    }
    .left-icons-container {
      margin-left: 12px;
      margin-right: 12px;
    }
    .search-input {
      margin-left: 12px;
    }
    .icon-container {
      display: flex;
      gap: 8px;
      overflow: auto;
      justify-content: center;
      .gpt-head-icons {
        cursor: pointer;
      }
    }
  }
`;

export default styles;
