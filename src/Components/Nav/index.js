import React, { useRef, useCallback } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Search from '@material-ui/icons/Search';
import queryString from 'query-string';

import { NavWrapper } from './style';
import { APP_NAME } from '../../Configs';

function Navigation() {
  const location = useLocation();
  const params = queryString.parse(location.search);
  const history = useHistory();
  const searchRef = useRef(null);
  const signedIn = useSelector((state) => state.auth.signedIn);

  const submit = useCallback((e) => {
    e.preventDefault();
    params.q = searchRef.current.value;
    history.push(`/search?${queryString.stringify(params)}`);
    // eslint-disable-next-line
  }, []);

  return (
    <Navbar as={NavWrapper} bg="dark" expand="lg" variant="dark">
      <Link className="navbar-brand" to="/">
        {APP_NAME}
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link as={Link} role="button" to="/feedback">
            Feedback
          </Nav.Link> */}
          <form className="input-group" onSubmit={submit}>
            <input
              type="text"
              placeholder="Tìm tên phim"
              ref={searchRef}
              defaultValue={params.q || ''}
            />
            <button type="submit" className="d-flex align-self-center">
              <Search />
            </button>
          </form>
        </Nav>
        {signedIn ? (
          <Nav>
            <Nav.Link as={Link} role="button" to="/db/upload">
              Upload
            </Nav.Link>
            <NavDropdown title="Bảo">
              <NavDropdown.Item as={Link} to="/db/casts">
                Cast
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/db/directors">
                Director
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/db/genres">
                Genre
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/db/feedbacks">
                Feedback
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/db/movies">
                Movie
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/sign-out">
                Sign out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link as={Link} to="/sign-in">
              Sign in
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
