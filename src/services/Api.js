import axios from 'axios';
import { getToken } from './authService';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8081',
});


// Interceptor: agregar token a cada petición
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor: manejar errores 401/403
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Redirigir al login si el token es inválido
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;