import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Form, Container } from 'react-bootstrap';
import { Comments, Like } from 'react-facebook';
import Helmet from 'react-helmet';
import Plyr from 'plyr';
import 'plyr/src/sass/plyr.scss';
import WebTorrent from 'webtorrent';
import _ from 'lodash';
import moment from 'moment';
import Rating from '@material-ui/lab/Rating';

import { MovieWrapper } from './style';
import { getMovie } from '../../Api/movie';
import { BASE_URL, APP_NAME } from '../../Configs';

function Movie() {
  const captionSizeRef = useRef(null);
  const playerRef = useRef(null);
  const viRef = useRef(null);
  const enRef = useRef(null);
  const totalDownloadedRef = useRef(null);
  const downloadSpeedRef = useRef(null);
  const progressRef = useRef(null);
  const numPeerRef = useRef(null);
  const [movie, setMovie] = useState({});
  const slug = useLocation().pathname.split('/').pop();
  const client = new WebTorrent();

  const formatBytes = useCallback((bytes) => {
    return (bytes / 1048576).toFixed(2);
  }, []);

  const changeSizeOfCaptions = useCallback((size) => {
    localStorage.setItem('caption-size', size);
    size += 'px';
    // document.documentElement.style.setProperty('--plyr-font-size-base', size);
    // document.documentElement.style.setProperty('--plyr-font-size-small', size);
    document.documentElement.style.setProperty('--plyr-font-size-large', size);
    document.documentElement.style.setProperty('--plyr-font-size-xlarge', size);
  }, []);

  useEffect(() => {
    const captionSize = localStorage.getItem('caption-size');
    if (captionSize) {
      changeSizeOfCaptions(captionSize);
      captionSizeRef.current.value = captionSize;
    }

    client.on('torrent', function (torrent) {
      new Plyr(playerRef.current, {
        controls: [
          'play-large', // The large play button in the center
          'rewind', // Rewind by the seek time (default 10 seconds)
          'play', // Play/pause playback
          'fast-forward', // Fast forward by the seek time (default 10 seconds)
          'progress', // The progress bar and scrubber for playback and buffering
          'current-time', // The current time of playback
          'duration', // The full duration of the media
          'mute', // Toggle mute
          'volume', // Volume control
          'captions', // Toggle captions
          'settings', // Settings menu
          'airplay', // Airplay (currently Safari only)
          'fullscreen', // Toggle fullscreen
        ],
        autoplay: true,
        clickToPlay: true,
        captions: { active: true, language: 'vi', update: false },
      });

      torrent.on('download', function (bytes) {
        totalDownloadedRef.current.innerHTML = formatBytes(torrent.downloaded);
        downloadSpeedRef.current.innerHTML = formatBytes(torrent.downloadSpeed);
        progressRef.current.innerHTML = (torrent.progress * 100).toFixed(2);
        numPeerRef.current.innerHTML = torrent.numPeers;
      });
    });

    return () => {
      client.destroy();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getMovie(slug)
      .then((e) => {
        setMovie(_.omit(e.data, ['magnetURI', 'captions']));

        enRef.current.src = `${BASE_URL}/${slug}/${e.data.captions.en}`;
        viRef.current.src = `${BASE_URL}/${slug}/${e.data.captions.vi}`;

        client.add(e.data.magnetURI, (torrent) => {
          const file = torrent.files.find((file) => file.name.endsWith('.mp4'));
          file.renderTo(playerRef.current);
        });
      })
      .catch((e) => {
        console.log(e.response);
      });
    // eslint-disable-next-line
  }, [slug]);

  return (
    <MovieWrapper>
      <Helmet>
        <title>
          {_.get(movie, 'title') ? `${movie.title} - ${APP_NAME}` : APP_NAME}
        </title>
      </Helmet>
      <div className="player-area">
        <Container>
          <video ref={playerRef} crossOrigin="anonymous" playsInline>
            <track
              kind="captions"
              label="Vietnamese"
              srcLang="vi"
              ref={viRef}
            />
            <track kind="captions" label="English" srcLang="en" ref={enRef} />
          </video>
        </Container>
      </div>
      <Container>
        <div className="d-flex flex-wrap mt-3">
          <div className="progress-video flex-grow-1">
            Total downloaded: <span ref={totalDownloadedRef} /> MB
            <br />
            Download speed: <span ref={downloadSpeedRef} /> MB/s
            <br />
            Progress: <span ref={progressRef} /> %
            <br />
            Peer: <span ref={numPeerRef} />
          </div>
          <div className="caption-size d-flex align-items-center">
            <span className="text-secondary">Cỡ chữ phụ đề</span>
            <Form.Control
              type="range"
              step="1"
              min="16"
              max="50"
              defaultValue="18"
              ref={captionSizeRef}
              onChange={(e) => changeSizeOfCaptions(e.target.value)}
            />
          </div>
        </div>
        <hr />
        <h2>{movie.title}</h2>
        <div className="text-secondary">{movie.originalTitle}</div>
        <div>
          Rating: {movie.rating}
          <Rating
            name="half-rating"
            value={+(+movie.rating / 2).toFixed(1)}
            precision={0.5}
          />
        </div>
        <div>Ngày phát hành: {moment(movie.releaseDate).format('D/M/Y')}</div>
        <div>
          Thể loại:
          {movie.genres &&
            movie.genres.map((e) => (
              <Link to={`/search?genre=${e.slug}`} key={e.slug}>
                {` ${e.name},`}
              </Link>
            ))}
        </div>
        <hr />
        <Like href={window.location.href} showFaces share />
        <hr />
        <p>{movie.description}</p>
        <hr />
        <Comments width="100%" href={window.location.href} />
      </Container>
    </MovieWrapper>
  );
}

export default Movie;
