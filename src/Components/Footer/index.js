import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import { FooterWrapper } from './style';
import { APP_NAME } from '../../Configs';

function Footer({ location }) {
  const ignorePath = ['/auth/sign-in'];

  return (
    <>
      {ignorePath.includes(location.pathname) ? null : (
        <FooterWrapper>
          <div className="d-flex">
            <div>
              <Link to="/">{APP_NAME}</Link>
            </div>
          </div>
          <div>Copyright &#169; 2020 - bphamict</div>
        </FooterWrapper>
      )}
    </>
  );
}

export default withRouter(Footer);
