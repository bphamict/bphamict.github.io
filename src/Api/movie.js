import axios from './instance';

export const queryMovie = (query = '') => {
  return axios.get(`/movies?${query}`);
};

export const getMovie = (slug) => {
  return axios.get(`/movies/${slug}`);
};

export const postMovie = (data) => {
  return axios.post(`/movies`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
  });
};

export const putMovie = (id, data) => {
  return axios.put(`/movies/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
  });
};

export const handleAPIFail = (func) => {
  return func().catch((e) => {
    if (e.statusCode === 400 && e.message === 'token_is_expired') {
      // refresh token
      // store into cookie
      // callback api
      return func();
    }
    throw e;
  });
};

export const deleteMovie = (id) => {
  return axios.delete(`/movies/${id}`);
};
