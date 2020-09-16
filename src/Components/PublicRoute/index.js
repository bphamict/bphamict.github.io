import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Route from '../RouteWithTitle';

function PublicRoute({ component: Component, restricted = false, ...rest }) {
  const signedIn = useSelector((state) => state.auth.signedIn);

  // restricted = false meaning public route
  // restricted = true meaning restricted route

  return (
    <Route
      {...rest}
      render={(props) =>
        signedIn && restricted ? (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default PublicRoute;
