import { css } from "lit";

const styles = css`
        .popup-overview .box {
          width: 340px;
          padding: 12px;
          min-height: 50px;
          color: var(--txt-primary-blue);
          background: var(--white);
          border-radius: var(--sl-border-radius-medium);
          box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
        }
        
        .box {
          width: 300px;
          padding: 12px;
          min-height: 50px;
          color: var(--txt-primary-blue);
          background: var(--white);
          border-radius: var(--sl-border-radius-medium);
          box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
          .user-info-container {
            border: 1px solid var(----icon-gray);
            padding: 12px 0;
            .link-btn {
              width: 100%;
            }
          }
        }
`

export default styles