import { getGenre } from '../../Api/genre';

export const ADD = 'ADD';

export const getAllGenres = () => {
  return async (dispatch) => {
    const result = await getGenre();
    dispatch({
      type: ADD,
      genres: result.data,
    });
  };
};
