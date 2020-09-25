import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Layout from '../../../Layouts';

function Tag() {
  return (
    <Layout>
      <h2>Tag</h2>
      <hr style={{ marginTop: 0 }} />
      <Form inline>
        <Form.Control
          type="text"
          className=" mr-sm-2"
          placeholder="Enter cast's name"
        />
        <Button type="submit">Add</Button>
      </Form>
    </Layout>
  );
}

export default Tag;
