import axios from 'axios';
import {
    accessErrorInterceptorHandler,
    accessRequestInterceptorHandler,
    loggingRequestInterceptorHandlers,
    loggingResponseInterceptorHandlers,
    transformErrorInterceptorHandler,
} from './interceptors';

export const api = axios.create({
    baseURL: 'https://api.workclub.pro',
    validateStatus: status => status >= 200 && status <= 302,
});

api.interceptors.request.use(accessRequestInterceptorHandler);
api.interceptors.request.use(...loggingRequestInterceptorHandlers);

api.interceptors.response.use(response => response, transformErrorInterceptorHandler);
api.interceptors.response.use(...loggingResponseInterceptorHandlers);
api.interceptors.response.use(response => response, accessErrorInterceptorHandler);
