import { SIGN_IN, SIGN_OUT, ACCESS_TOKEN_KEY } from '../actions/auth';

const initialState = {
  signedIn: localStorage.getItem(ACCESS_TOKEN_KEY) ? true : false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        signedIn: true,
      };
    case SIGN_OUT:
      return {
        ...state,
        signedIn: false,
      };
    default:
      return state;
  }
};
