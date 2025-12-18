// src/services/productsService.js
import { getToken } from './authService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/api/productos`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('Error al obtener productos');
  return await response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/api/productos/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('Error al obtener producto');
  return await response.json();
};

export const getCategories = async (products = []) => {
  // Extraer categorías únicas de los productos (sin hacer otra llamada)
  const categories = [...new Set(products.map(p => p.categoria).filter(Boolean))];
  return categories.sort();
};

export const createOrder = async (orderData) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/api/pedidos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) throw new Error('Error al crear pedido');
  return await response.json();
};

export const getOrders = async () => {
  const token = getToken();
  const response = await fetch(`${API_URL}/api/pedidos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Error al obtener pedidos');
  return await response.json();
};
