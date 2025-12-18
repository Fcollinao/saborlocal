// src/context/AppContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { getToken, getUser, isAuthenticated } from '../services/authService';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Carrito persistente
  const [carrito, setCarrito] = useState(() => {
    const saved = localStorage.getItem('saborlocal_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [auth, setAuth] = useState({
    loading: true,
    isAuthenticated: false,
    user: null,
  });

  // Cargar sesión al iniciar la app
  useEffect(() => {
    const token = getToken();
    const user = getUser();

    if (token && user && isAuthenticated()) {
      setAuth({
        loading: false,
        isAuthenticated: true,
        user,
      });
    } else {
      setAuth({
        loading: false,
        isAuthenticated: false,
        user: null,
      });
    }
  }, []);

  // Sincronizar carrito con localStorage
  useEffect(() => {
    localStorage.setItem('saborlocal_cart', JSON.stringify(carrito));
  }, [carrito]);

  // Auth
  const login = (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuth({
      loading: false,
      isAuthenticated: true,
      user,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({
      loading: false,
      isAuthenticated: false,
      user: null,
    });
    setCarrito([]);
    localStorage.removeItem('saborlocal_cart');
  };

  // Carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => [...prev, producto]);
  };

  const eliminarDelCarrito = (index) => {
    setCarrito((prev) => prev.filter((_, i) => i !== index));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem('saborlocal_cart');
  };

  return (
    <AppContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        auth,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

