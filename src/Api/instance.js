import axios from 'axios';
import { BASE_URL, API_VERSION } from '../Configs';

const instance = axios.create({
  baseURL: `${BASE_URL}/${API_VERSION}`,
});

export default instance;
