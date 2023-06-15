import axios from 'axios';
import { apiRoutes } from '../utils/constants.util';

const client = axios.create({
  baseURL: apiRoutes.baseUrl,
});

export default client;
