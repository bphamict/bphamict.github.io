import axios from './instance';
import { THEMOVIEDB_API_KEY } from '../Configs';

export const crawlMovie = (query, year) =>
  new Promise(async (resolve, reject) => {
    try {
      const findMovie = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${THEMOVIEDB_API_KEY}&language=vi-VN&query=${query}&page=1&include_adult=false&year=${year}`
      );

      const movie = await axios.get(
        `https://api.themoviedb.org/3/movie/${findMovie.data.results[0].id}?api_key=${THEMOVIEDB_API_KEY}&language=vi-VN`
      );

      const video = await axios.get(
        `https://api.themoviedb.org/3/movie/${findMovie.data.results[0].id}/videos?api_key=${THEMOVIEDB_API_KEY}`
      );
      movie.data.trailer = video.data.results[0].key;

      if (movie.data.overview === '') {
        const temp = await axios.get(
          `https://api.themoviedb.org/3/movie/${findMovie.data.results[0].id}?api_key=${THEMOVIEDB_API_KEY}&language=en-US`
        );
        movie.data.overview = temp.data.overview;
      }

      resolve(movie);
    } catch (e) {
      reject(e);
    }
  });
