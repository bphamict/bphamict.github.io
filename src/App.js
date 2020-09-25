import React, { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Home from './Containers/Home';
import Feedback from './Containers/Feedback';
import Signin from './Containers/Signin';
import Signout from './Containers/Signout';
import DBCast from './Containers/Dashboard/Cast';
import DBDirector from './Containers/Dashboard/Director';
import DBFeedback from './Containers/Dashboard/Feedback';
import DBGenre from './Containers/Dashboard/Genre';
import DBMovie from './Containers/Dashboard/Movie';
import DBTag from './Containers/Dashboard/Tag';
import DBUploadEdit from './Containers/Dashboard/Upload-Edit';
import { getAllGenres } from './Redux/actions/genre';

const Movie = lazy(() => import('./Containers/Movie'));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/search" component={Home} exact />
        <Route path="/feedback" component={Feedback} exact />
        <Route path="/movies/:slug" component={Movie} exact />
        <Route path="/auth/:path" exact>
          <Switch>
            <Route path="/auth/sign-in" component={Signin} exact />
            <Route path="/auth/sign-out" component={Signout} exact />
          </Switch>
        </Route>
        <Route path="/dashboard/:path" exact>
          <Switch>
            <Route path="/dashboard/casts" component={DBCast} exact />
            <Route path="/dashboard/directors" component={DBDirector} exact />
            <Route path="/dashboard/feedbacks" component={DBFeedback} exact />
            <Route path="/dashboard/genres" component={DBGenre} exact />
            <Route path="/dashboard/movies" component={DBMovie} exact />
            <Route path="/dashboard/tags" component={DBTag} exact />
            <Redirect to="/" />
          </Switch>
        </Route>
        <Route path="/dashboard/:path/:path" exact>
          <Switch>
            <Route
              path="/dashboard/movies/upload"
              render={(props) => <DBUploadEdit {...props} type="Upload" />}
              exact
            />
            <Route
              path="/dashboard/movies/:slug"
              render={(props) => <DBUploadEdit {...props} type="Edit" />}
              exact
            />
            <Redirect to="/dashboard/movies" />
          </Switch>
        </Route>
        <Redirect to="/" />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
