import { combineReducers } from 'redux';

import auth from './auth';
import genre from './genre';

export default combineReducers({ auth, genres: genre });
