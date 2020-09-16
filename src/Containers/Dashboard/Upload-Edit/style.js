import styled from 'styled-components';

export const UploadWrapper = styled.form`
  input[type='file'] {
    color: transparent;
  }

  .toast {
    background-color: #ffffff;
    position: fixed;
    top: 10%;
    z-index: 1;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
`;
