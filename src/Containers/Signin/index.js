import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { signin as signinApi } from '../../Api/auth';
import { signin as signinFn } from '../../Redux/actions/auth';

function Signin() {
  const identifierRef = useRef(null);
  const passwordRef = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    const identifier = identifierRef.current.value;
    const password = passwordRef.current.value;
    signinApi({ identifier, password })
      .then((e) => {
        dispatch(signinFn(e.data.accessToken, e.data.refreshToken));
        history.push('/');
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  return (
    <div className="d-flex justify-content-center">
      <Col lg={4} md={6}>
        <Form onSubmit={submit}>
          <h2 className="text-center py-3">Administrator</h2>
          <Form.Group>
            <Form.Label>Username or email</Form.Label>
            <Form.Control type="text" ref={identifierRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required />
          </Form.Group>
          <Button variant="primary" type="submit" block>
            Signin
          </Button>
        </Form>
      </Col>
    </div>
  );
}

export default Signin;
