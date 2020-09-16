import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Row, Col, Image } from 'react-bootstrap';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import queryString from 'query-string';
import { useSelector } from 'react-redux';

import { HomeWrapper } from './style';
import { queryMovie } from '../../Api/movie';

function Home() {
  const history = useHistory();
  const location = useLocation();
  const params = queryString.parse(location.search);
  const [movies, setMovies] = useState([]);
  const genres = useSelector((state) => state.genres);

  const changeGenre = useCallback((e) => {
    params.genre = e.target.value;
    history.push(`/search?${queryString.stringify(params)}`);
    // eslint-disable-next-line
  }, []);

  const changeSortBy = useCallback((e) => {
    params.sortBy = e.target.value;
    history.push(`/search?${queryString.stringify(params)}`);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    queryMovie(queryString.stringify(params)).then((e) => {
      setMovies(e.data);
    });
    // eslint-disable-next-line
  }, [location.search]);

  return (
    <HomeWrapper>
      <div className="d-flex justify-content-end">
        <FormControl>
          <InputLabel shrink>Thể loại</InputLabel>
          <Select defaultValue={params.genre || 'all'} onChange={changeGenre}>
            <MenuItem value="all">Tất cả</MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre.slug} value={genre.slug}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="ml-4">
          <InputLabel shrink>Xếp theo</InputLabel>
          <Select
            defaultValue={params.sortBy || 'newest'}
            onChange={changeSortBy}
          >
            <MenuItem value="newest">Mới nhất</MenuItem>
            <MenuItem value="popularity">Phổ biến</MenuItem>
            <MenuItem value="rating">Xếp hạng</MenuItem>
            <MenuItem value="trending">Xu hướng</MenuItem>
            <MenuItem value="year">Năm</MenuItem>
          </Select>
        </FormControl>
      </div>
      <hr style={{ marginTop: '.3rem' }} />
      <Row>
        {movies.length !== 0 &&
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
  );
}

export default Home;
