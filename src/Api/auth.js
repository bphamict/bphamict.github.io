import axios from './instance';

export const signin = (data) => {
  return axios.post(`/auth/sign-in`, {
    data: '==' + Buffer.from(JSON.stringify(data)).toString('base64'),
  });
};

export const refreshToken = (data) => {
  return axios.post(`/auth/refresh-token`, data);
};
