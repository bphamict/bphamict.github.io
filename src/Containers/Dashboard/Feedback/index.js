import React from 'react';
import Table from 'react-bootstrap/Table';

function Feedback() {
  const data = [
    {
      email: 'test@test.test',
      type: 'bug-report',
      content: 'dadfnsdffa nerjnselkrf',
    },
    {
      email: 'test@test.test',
      type: 'bug-report',
      content: 'dadfnsdffa nerjnselkrf',
    },
  ];
  return (
    <>
      <h2>Feedback</h2>
      <hr style={{ marginTop: 0 }} />
      <Table hover>
        <thead className="bg-dark text-light">
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Type</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((e, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{e.email}</td>
                <td>{e.type}</td>
                <td>{e.content}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}

export default Feedback;
