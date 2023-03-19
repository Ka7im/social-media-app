import axios from 'axios';

export const $host = axios.create({ baseURL: 'http://localhost:5000' });
