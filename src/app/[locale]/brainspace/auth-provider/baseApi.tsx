import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_PATH = 'general';

const baseApi = axios.create({
  baseURL: `${BASE_URL}${API_PATH}`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Client-Type': 'web'
  }
});

export default baseApi;
