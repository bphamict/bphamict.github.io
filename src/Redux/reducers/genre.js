import { ADD } from '../actions/genre';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return action.genres;
    default:
      return state;
  }
};
