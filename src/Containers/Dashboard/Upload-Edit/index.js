import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Form, Row, Col, Button, Toast } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { useSelector } from 'react-redux';

import { UploadWrapper } from './style';
import { postMovie, getMovie, putMovie } from '../../../Api/movie';
import { crawlMovie } from '../../../Api/themoviedb';

function Upload({ type, match }) {
  const params = useParams();
  const _idRef = useRef(null);
  const magnetURIRef = useRef(null);
  const trailerRef = useRef(null);
  const posterRef = useRef(null);
  const titleRef = useRef(null);
  const originalTitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const durationRef = useRef(null);
  const ratingRef = useRef(null);
  const yearRef = useRef(null);
  const releaseDateRef = useRef(null);
  const directorRef = useRef(null);
  const castRef = useRef(null);
  const genreRef = useRef(null);
  const tagRef = useRef(null);
  const viRef = useRef(null);
  const enRef = useRef(null);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  const genres = useSelector((state) => state.genres);

  const crawl = useCallback(() => {
    crawlMovie(originalTitleRef.current.value, yearRef.current.value)
      .then((e) => {
        trailerRef.current.value = e.data.trailer;
        posterRef.current.value = e.data.poster_path;
        titleRef.current.value = e.data.title;
        originalTitleRef.current.value = e.data.original_title;
        descriptionRef.current.value = e.data.overview;
        ratingRef.current.value = e.data.vote_average;
        yearRef.current.value = e.data.release_date.substring(0, 4);
        releaseDateRef.current.value = e.data.release_date;
        // directorRef.current.value
        // castRef.current.value
        genreRef.current.value = '';
        e.data.genres.forEach((genre) => {
          genreRef.current.value += `${genre.name}, `;
        });
        // tagRef.current.value
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, []);

  const submit = useCallback(
    async (e) => {
      e.preventDefault();

      const genresInput = genreRef.current.value.split(', ').slice(0, -1);
      const genreIds = [];
      genresInput.forEach((genre) => {
        genreIds.push(genres.find((e) => e.name === genre)._id);
      });

      const data = {
        magnetURI: magnetURIRef.current.value,
        poster: posterRef.current.value,
        trailer: trailerRef.current.value,
        title: titleRef.current.value,
        originalTitle: originalTitleRef.current.value,
        description: descriptionRef.current.value,
        duration: durationRef.current.value,
        year: yearRef.current.value,
        releaseDate: releaseDateRef.current.value,
        rating: ratingRef.current.value,
        // director: directorRef.current.value,
        // casts: castRef.current.value,
        genres: genreIds,
        // tags: tagRef.current.value,
        captions: {
          vi: viRef.current.value,
          en: enRef.current.value,
        },
      };

      type === 'Upload' &&
        postMovie(data)
          .then((e) => {
            if (e.status === 201) {
              setShowToast(true);
              setMessage('Uploaded!');
            }
          })
          .catch((e) => {
            setShowToast(true);
            setMessage(e.response.data.message);
          });

      type === 'Edit' &&
        putMovie(_idRef.current, data)
          .then((e) => {
            if (e.status === 200) {
              setShowToast(true);
              setMessage('Edited!');
            }
          })
          .catch((e) => {
            setShowToast(true);
            setMessage(e.response.data.message);
          });
    },
    [type, genres]
  );

  useEffect(() => {
    if (_.get(params, 'slug')) {
      getMovie(params.slug)
        .then((e) => {
          _idRef.current = e.data._id;
          magnetURIRef.current.value = e.data.magnetURI;
          posterRef.current.value = e.data.poster;
          trailerRef.current.value = e.data.trailer;
          titleRef.current.value = e.data.title;
          originalTitleRef.current.value = e.data.originalTitle;
          descriptionRef.current.value = e.data.description;
          durationRef.current.value = e.data.duration;
          yearRef.current.value = e.data.year;
          releaseDateRef.current.value = e.data.releaseDate;
          ratingRef.current.value = e.data.rating;
          // directorRef.current.value = e.data.director;
          // castRef.current.value = e.data.cast;
          genreRef.current.value = '';
          e.data.genres.forEach((genre) => {
            genreRef.current.value += `${genre.name}, `;
          });
          // tagRef.current.value = e.data.tag;
          viRef.current.value = e.data.captions.vi;
          enRef.current.value = e.data.captions.en;
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  }, [params]);

  return (
    <Form onSubmit={submit} as={UploadWrapper}>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        autohide
        delay={3000}
      >
        <Toast.Header>
          <strong className="mr-auto">Result</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
      <div className="d-flex">
        <h2 className="flex-grow-1">{type} movie</h2>
        <div>
          <Button type="reset" variant="danger" size="sm">
            Clear All
          </Button>
          <Button
            variant="info"
            size="sm"
            className="ml-2"
            onClick={() => crawl()}
          >
            Crawl
          </Button>
          <Button type="submit" variant="primary" size="sm" className="ml-2">
            Done
          </Button>
        </div>
      </div>
      <hr style={{ marginTop: 0 }} />
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label>MagnetURI</Form.Label>
            <Form.Control size="sm" type="text" ref={magnetURIRef} required />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Trailer</Form.Label>
              <Form.Control size="sm" type="text" ref={trailerRef} required />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Poster</Form.Label>
              <Form.Control size="sm" type="text" ref={posterRef} required />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Title</Form.Label>
              <Form.Control size="sm" type="text" ref={titleRef} required />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Original title (*)</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                ref={originalTitleRef}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              size="sm"
              as="textarea"
              rows={3}
              ref={descriptionRef}
              required
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Duration</Form.Label>
              <Form.Control
                size="sm"
                type="number"
                ref={durationRef}
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Rating</Form.Label>
              <Form.Control size="sm" type="text" ref={ratingRef} required />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Year</Form.Label>
              <Form.Control size="sm" type="number" ref={yearRef} required />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Release date</Form.Label>
              <Form.Control
                size="sm"
                type="date"
                ref={releaseDateRef}
                required
              />
            </Form.Group>
          </Form.Row>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Director</Form.Label>
            <Form.Control size="sm" type="text" ref={directorRef} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Casts</Form.Label>
            <Form.Control size="sm" type="text" ref={castRef} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Genres</Form.Label>
            <Form.Control size="sm" type="text" ref={genreRef} disabled />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tags</Form.Label>
            <Form.Control size="sm" type="text" ref={tagRef} />
          </Form.Group>
          <Form.Label>Captions</Form.Label>
          <Form.Row>
            <Form.Group as={Col} md={4} xs={6}>
              <Form.Label>VI</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                ref={viRef}
                defaultValue="vi.vtt"
                required
              />
            </Form.Group>
            <Form.Group as={Col} md={4} xs={6}>
              <Form.Label>EN</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                ref={enRef}
                defaultValue="en.vtt"
                required
              />
            </Form.Group>
          </Form.Row>
        </Col>
      </Row>
    </Form>
  );
}

export default Upload;
