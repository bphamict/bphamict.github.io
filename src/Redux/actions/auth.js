export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const ACCESS_TOKEN_KEY = 'jwt';
export const REFRESH_TOKEN_KEY = 'reJwt';

export const signin = (accessToken, refreshToken) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  return {
    type: SIGN_IN,
  };
};

export const signout = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  return {
    type: SIGN_OUT,
  };
};
