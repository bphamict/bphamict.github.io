import styled from 'styled-components';

export const HomeWrapper = styled.div`
  min-height: calc(100vh - 192px);

  .MuiFormControl-root {
    min-width: 100px;

    .MuiInput-underline:before {
      border-bottom: none;
    }

    .MuiInput-underline:hover:not(.Mui-disabled):before {
      border-bottom: none;
    }

    .MuiSelect-select:focus {
      background-color: transparent;
    }
  }

  .row {
    padding-left: 5px;
    padding-right: 5px;

    > div {
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  a {
    display: block;
    color: #212529;

    .poster {
      width: inherit;
      overflow: hidden;
      box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);

      img {
        width: 100%;
        min-height: 252px;
        object-fit: cover;
      }

      @media only screen and (max-width: 1199px) {
        img {
          min-height: 207px;
        }
      }
    }

    &:hover {
      transform: scale(1.01);
      text-decoration: none;
    }
  }

  h2 {
    font-size: medium;
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .text-secondary {
    font-size: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
