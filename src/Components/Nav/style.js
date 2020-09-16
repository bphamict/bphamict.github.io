import styled from 'styled-components';

export const NavWrapper = styled.nav`
  background-color: #242526 !important;

  .navbar-brand {
    color: #f36c5d;
    transition: 0.2s;

    &:hover {
      color: #f26b38;
    }
  }

  .dropdown-menu {
    left: -100px;
  }

  .input-group {
    margin-left: 20px;
    border-radius: 0.25rem;
    background-color: #3a3b3c;
    flex-wrap: nowrap;
    width: 300px;
    height: 40px;

    &:focus-within {
      // border-color: #80bdff;
      // box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }

    input {
      background-color: transparent;
      border-color: transparent;
      width: 100%;
      padding-left: 10px;
      color: rgba(255, 255, 255, 0.4);

      &::placeholder {
        color: rgba(255, 255, 255, 0.4);
      }

      &:focus {
        outline: none;

        &::placeholder {
          color: #606770;
        }
      }
    }

    button {
      background: transparent;
      border: none;
      padding-right: 10px;
      padding-left: 6px;

      &:focus {
        outline: none;
      }

      .MuiSvgIcon-root {
        font-size: 1.5rem !important;
        color: rgba(255, 255, 255, 0.4);
      }
    }

    @media only screen and (max-width: 991px) {
      margin: 0.5rem 0;
      width: 100%;
    }
  }
`;
