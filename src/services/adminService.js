// src/services/adminService.js
import { getToken } from './authService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

// ============ PRODUCTOS ============

export const adminGetProducts = async () => {
  const token = getToken();
  const response = await fetch(`${API_URL}/admin/productos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Error al obtener productos');
  return await response.json();
};

export const adminCreateProduct = async (productData) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/admin/productos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error('Error al crear producto');
  return await response.json();
};

export const adminUpdateProduct = async (id, productData) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/admin/productos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error('Error al actualizar producto');
  return await response.json();
};

export const adminDeleteProduct = async (id) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/admin/productos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Error al eliminar producto');
  return await response.json();
};

// ============ PRODUCTORES ============

export const adminGetProducers = async () => {
  const token = getToken();
  const response = await fetch(`${API_URL}/admin/productores`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Error al obtener productores');
  return await response.json();
};

export const adminCreateProducer = async (producerData) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/admin/productores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(producerData),
  });
  if (!response.ok) throw new Error('Error al crear productor');
  return await response.json();
};

export const adminUpdateProducer = async (id, producerData) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/admin/productores/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(producerData),
  });
  if (!response.ok) throw new Error('Error al actualizar productor');
  return await response.json();
};

export const adminDeleteProducer = async (id) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/admin/productores/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Error al eliminar productor');
  return await response.json();
};

// ============ USUARIOS CLIENTES ============

export const adminGetUsers = async () => {
  const token = getToken();
  const response = await fetch(`${API_URL}/admin/usuarios`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Error al obtener usuarios');
  return await response.json();
};

export const adminUpdateUser = async (id, userData) => {
  const token = getToken();
  console.log('📤 Enviando PUT a /admin/usuarios/' + id, userData);
  const response = await fetch(`${API_URL}/admin/usuarios/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    console.error('❌ Error 500 en PUT /admin/usuarios:', error);
    throw new Error('Error al actualizar usuario');
  }
  return await response.json();
};

export const adminDeleteUser = async (id) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/admin/usuarios/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Error al eliminar usuario');
  return await response.json();
};
