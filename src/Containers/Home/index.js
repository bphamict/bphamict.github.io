import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Row, Col, Image } from 'react-bootstrap';
import { LinearProgress } from '@material-ui/core';
import queryString from 'query-string';
import Helmet from 'react-helmet';

import Layout from '../../Layouts';
import { HomeWrapper } from './style';
import { queryMovie } from '../../Api/movie';
import FilterBar from './FilterBar';
import { APP_NAME } from '../../Configs';

function Home() {
  const location = useLocation();
  const params = queryString.parse(location.search);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies([]);
    queryMovie(queryString.stringify(params)).then((e) => {
      setMovies(e.data);
    });
    // eslint-disable-next-line
  }, [location.search]);

  return (
    <Layout>
      <HomeWrapper>
        <Helmet>
          <title>{APP_NAME} - Xem phim mới miễn phí chất lượng cao</title>
        </Helmet>
        <FilterBar />
        <hr style={{ marginTop: '.3rem' }} />
        {movies.length === 0 && <LinearProgress />}
        <Row>
          {movies.length > 0 &&
            movies.map((movie) => (
              <Col
                key={movie.slug}
                className="mb-3"
                lg={{ span: 2 }}
                md={{ span: 3 }}
                sm={{ span: 4 }}
                xs={{ span: 6 }}
              >
                <Link to={`/movies/${movie.slug}`}>
                  <div className="poster rounded">
                    <Image
                      src={`https://image.tmdb.org/t/p/w300${movie.poster}`}
                      alt={movie.title}
                    />
                  </div>
                  <h2 className="mt-2">{movie.title}</h2>
                  <div className="text-secondary">{movie.originalTitle}</div>
                </Link>
              </Col>
            ))}
        </Row>
      </HomeWrapper>
    </Layout>
  );
}

export default Home;
