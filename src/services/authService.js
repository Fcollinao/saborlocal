// src/services/authService.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw new Error('Credenciales inválidas');

  const data = await response.json();
  localStorage.setItem('token', data.token);
  
  // Normalizar el rol (el backend puede enviarlo como "rol", "role", "type", etc)
  const rol = data.rol || data.role || data.type || 'customer';
  
  localStorage.setItem(
    'user',
    JSON.stringify({ email: data.email, rol, name: data.nombre || data.name })
  );
  return data;
};

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error en el registro');
  }

  return await response.json();
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getToken = () => localStorage.getItem('token');

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => !!getToken();
