import styled from 'styled-components';

export const MovieWrapper = styled.div`
  .player-area {
    background-color: #000000;
    height: 463px;

    .plyr {
      height: 463px;
    }
  }

  h2 {
    margin-bottom: 0;
  }

  .MuiRating-root {
    font-size: medium;
    margin-left: 6px;
  }

  .progress-video {
    font-size: 0.8rem;
    line-height: 0.96rem;
  }

  .caption-size {
    flex-basis: 400px;

    span {
      width: 160px;
    }

    input {
      height: 2px;
    }
  }

  .fb-like,
  .fb-like > span,
  .fb-like > span iframe {
    max-width: 300px;
  }

  a {
    text-decoration: none;
  }

  @media only screen and (max-width: 1200px) {
    .player-area {
      height: auto !important;

      .plyr {
        height: auto !important;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .caption-size {
      margin-top: 10px;
      flex-basis: 100%;
    }
  }

  @media only screen and (max-width: 575px) {
    .player-area {
      .container {
        padding: 0;
      }
    }
  }
`;
