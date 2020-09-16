import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signout as signoutFn } from '../../Redux/actions/auth';

function Signout() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signoutFn());
    history.push('/');
  }, [history, dispatch]);

  return <></>;
}

export default Signout;
