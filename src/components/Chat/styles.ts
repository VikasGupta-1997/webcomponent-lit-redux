import { css } from "lit";

const styles = css`
  section {
    display: grid;
    grid-template-columns: 72px 0.8fr 2.2fr 2.2fr 1.4fr 72px;
    height: 100vh;
    .small-desktop {
      display: none;
    }
  }
  div:not(.customer-nav) {
    border-right: 1px solid lightgray;
  }
  @media screen and (max-width: 1440px) {
    section {
      grid-template-columns: 72px 0.8fr 2.2fr 2.2fr 0.3fr 72px;
      .section-4 {
        border-right: none;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    section {
      grid-template-columns: 72px 0.8fr 0.3fr 2.2fr 0.3fr 72px;
    }
  }
`;

export default styles;
