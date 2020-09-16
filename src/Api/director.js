import axios from './instance';

export const getDirector = () => {
  return axios.get(`/directors`);
};

export const postDirector = (data) => {
  return axios.post(`/directors`, { data });
};

export const putDirector = (id, data) => {
  return axios.put(`/directors/${id}`, { data });
};

export const deleteDirector = (id) => {
  return axios.delete(`/directors/${id}`);
};
