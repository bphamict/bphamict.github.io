import axios from './instance';

export const getFeedback = () => {
  return axios.get(`/feedbacks`);
};

export const postFeedback = (data, captcha) => {
  return axios.post(`/feedbacks`, {
    data,
    headers: { 'g-recaptcha-response': captcha },
  });
};

export const deleteFeedback = (id) => {
  return axios.delete(`/feedbacks/${id}`);
};
