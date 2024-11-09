import axios from 'axios';
import { supabaseFunctionsUrl } from './variables';

const axiosInstance = axios.create({
  baseURL: supabaseFunctionsUrl,
});
