import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Route from '../RouteWithTitle';

function PrivateRoute({ component: Component, ...rest }) {
  const signedIn = useSelector((state) => state.auth.signedIn);

  return (
    <Route
      {...rest}
      render={(props) =>
        signedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
