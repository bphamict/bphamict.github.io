import React from 'react';
import { Container } from 'react-bootstrap';

function Layout({ children }) {
  return (
    <Container className="pt-4" style={{ minHeight: 'calc(100vh - 192px)' }}>
      {children}
    </Container>
  );
}

export default Layout;
