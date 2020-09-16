import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Director() {
  return (
    <>
      <h2>Director</h2>
      <hr style={{ marginTop: 0 }} />
      <Form inline>
        <Form.Control
          type="text"
          className=" mr-sm-2"
          placeholder="Enter director's name"
        />
        <Button type="submit">Add</Button>
      </Form>
    </>
  );
}

export default Director;
