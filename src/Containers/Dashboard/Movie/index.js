import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { Delete, Edit, Visibility } from '@material-ui/icons';

import Layout from '../../../Layouts';
import { queryMovie, deleteMovie } from '../../../Api/movie';

function Movie() {
  const history = useHistory();
  const [movie, setMovie] = useState({});

  const openNewTab = useCallback((slug) => {
    window.open(`/#/movies/${slug}`);
  }, []);

  const deleteMovieClick = useCallback((id) => {
    deleteMovie(id)
      .then((e) => {
        console.log(e.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, []);

  useEffect(() => {
    queryMovie()
      .then((e) => {
        setMovie(e.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, []);

  return (
    <Layout>
      <h2>Movie</h2>
      <hr style={{ marginTop: 0 }} />
      <Table hover>
        <thead className="bg-dark text-light">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Original title</th>
            <th>Rating</th>
            <th>Release date</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {movie.length > 0 &&
            movie.map((e, index) => (
              <tr key={e._id}>
                <td>{index + 1}</td>
                <td>{e.title}</td>
                <td>{e.originalTitle}</td>
                <td>{e.rating}</td>
                <td>{moment(e.releaseDate).format('DD/MM/YY')}</td>
                <td style={{ textAlign: 'right', padding: '.5rem' }}>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteMovieClick(e._id)}
                  >
                    <Delete />
                  </Button>
                  <Button
                    size="sm"
                    className="ml-2"
                    onClick={() => history.push(`/dashboard/movies/${e.slug}`)}
                  >
                    <Edit />
                  </Button>
                  <Button
                    size="sm"
                    className="ml-2"
                    variant="success"
                    onClick={() => openNewTab(e.slug)}
                  >
                    <Visibility />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Layout>
  );
}

export default Movie;
