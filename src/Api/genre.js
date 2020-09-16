import axios from './instance';

export const getGenre = () => {
  return axios.get(`/genres`);
};

export const postGenre = (data) => {
  return axios.post(`/genres`, { data });
};

export const putGenre = (id, data) => {
  return axios.put(`/genres/${id}`, { data });
};

export const deleteGenre = (id) => {
  return axios.delete(`/genres/${id}`);
};
