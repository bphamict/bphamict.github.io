import axios from './instance';

export const getTag = () => {
  return axios.get(`/tags`);
};

export const postTag = (data) => {
  return axios.post(`/tags`, { data });
};

export const putTag = (id, data) => {
  return axios.put(`/tags/${id}`, { data });
};

export const deleteTag = (id) => {
  return axios.delete(`/tags/${id}`);
};
