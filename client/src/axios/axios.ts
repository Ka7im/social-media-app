import axios, { InternalAxiosRequestConfig } from 'axios';
import { BASE_URL } from '../utils/consts';

const $host = axios.create({ baseURL: BASE_URL });

const $authHost = axios.create({ baseURL: BASE_URL });

const authInterceptor = (config: InternalAxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

    return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
