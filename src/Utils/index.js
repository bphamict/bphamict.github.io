const ACCESS_TOKEN_KEY = 'jwt';
const REFRESH_TOKEN_KEY = 'reJwt';

export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const isLogin = () => {
  if (localStorage.getItem(ACCESS_TOKEN_KEY)) return true;
  return false;
};
