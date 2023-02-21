import axios from 'axios';
import { ApiRoutes } from '../utils/constants';

const client = axios.create({
  baseURL: ApiRoutes.baseUrl,
});

export default client;
