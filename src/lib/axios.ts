import axios from 'axios';

const BASE_URL = 'http://localhost:3333'

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } return config;
}, (error) => Promise.reject(error))

export { api };

