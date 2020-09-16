import React, { useEffect } from 'react';
import { HashRouter as Router, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useDispatch } from 'react-redux';

import Movie from './Containers/Movie';
import Home from './Containers/Home';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Feedback from './Containers/Feedback';
import DBUploadEdit from './Containers/Dashboard/Upload-Edit';
import DBDirector from './Containers/Dashboard/Director';
import DBCast from './Containers/Dashboard/Cast';
import DBGenre from './Containers/Dashboard/Genre';
import DBTag from './Containers/Dashboard/Tag';
import DBFeedback from './Containers/Dashboard/Feedback';
import DBMovie from './Containers/Dashboard/Movie';
import PrivateRoute from './Components/PrivateRoute';
import PublicRoute from './Components/PublicRoute';
import Signin from './Containers/Signin';
import Signout from './Containers/Signout';
import { getAllGenres } from './Redux/actions/genre';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

  return (
    <Router>
      <Nav />
      <Switch>
        <PublicRoute path="/movies/:slug" component={() => <Movie />} exact />
        <Container className="mt-4">
          <PublicRoute
            title="Feedback"
            path="/feedback"
            component={() => <Feedback />}
            exact
          />
          <PrivateRoute
            title="Movies"
            path="/db/movies"
            component={() => <DBMovie />}
            exact
          />
          <PrivateRoute
            title="Upload"
            path="/db/upload"
            component={() => <DBUploadEdit type="Upload" />}
            exact
          />
          <PrivateRoute
            title="Edit"
            path="/db/movies/:slug"
            component={() => <DBUploadEdit type="Edit" />}
            exact
          />
          <PrivateRoute
            title="Directors"
            path="/db/directors"
            component={() => <DBDirector />}
            exact
          />
          <PrivateRoute
            title="Casts"
            path="/db/casts"
            component={() => <DBCast />}
            exact
          />
          <PrivateRoute
            title="Genres"
            path="/db/genres"
            component={() => <DBGenre />}
            exact
          />
          <PrivateRoute
            title="Tags"
            path="/db/tags"
            component={() => <DBTag />}
            exact
          />
          <PrivateRoute
            title="Feedbacks"
            path="/db/feedbacks"
            component={() => <DBFeedback />}
            exact
          />

          <PublicRoute
            title="Sign in"
            path="/sign-in"
            restricted
            component={() => <Signin />}
            exact
          />
          <PrivateRoute
            title="Sign out"
            path="/sign-out"
            component={() => <Signout />}
            exact
          />
          <PublicRoute
            path="/search"
            component={() => <Home title="" />}
            exact
          />
          <PublicRoute path="/" exact component={() => <Home title="" />} />
          {/* <PublicRoute component={() => <Redirect to="/" />} /> */}
        </Container>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
