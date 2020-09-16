import styled from 'styled-components';

export const HomeWrapper = styled.div`
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

  h2 {
    font-size: medium;
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .text-secondary {
    font-size: 0.8rem;
  }

  a {
    display: block;
    color: #212529;

    .poster {
      width: inherit;
      height: 100%;
      overflow: hidden;
      box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);

      img {
        width: 100%;
      }
    }

    &:hover {
      transform: scale(1.01);
      text-decoration: none;
    }
  }
`;
