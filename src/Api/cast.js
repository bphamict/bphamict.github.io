import axios from './instance';

export const getCast = () => {
  return axios.get(`/casts`);
};

export const postCast = (data) => {
  return axios.post(`/casts`, { data });
};

export const putCast = (id, data) => {
  return axios.post(`/casts/${id}`, { data });
};

export const deleteCast = (id) => {
  return axios.delete(`/casts/${id}`);
};
