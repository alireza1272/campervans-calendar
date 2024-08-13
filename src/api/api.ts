import axios from 'axios';

const axiosAPI = axios.create({
    baseURL: 'https://605c94c36d85de00170da8b4.mockapi.io/'
});
/**
 * Request interceptor
 * Add headers or modify the request config here
 */
axiosAPI.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

/**
 * Response interceptor
 */
axiosAPI.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
});

export default axiosAPI;
