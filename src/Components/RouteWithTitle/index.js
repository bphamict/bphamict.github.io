import React from 'react';
import Helmet from 'react-helmet';
import { Route } from 'react-router-dom';
import { APP_NAME } from '../../Configs';

function RouteWithTitle({ title, ...props }) {
  return (
    <>
      <Helmet>
        <title>{title ? `${title} - ${APP_NAME}` : APP_NAME}</title>
      </Helmet>
      <Route {...props} />
    </>
  );
}

export default RouteWithTitle;
