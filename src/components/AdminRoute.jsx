// src/components/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '40vh' }}
      >
        <div className="spinner-border text-danger me-2" role="status" />
        <span>Verificando permisos...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Verificar que el usuario sea admin (backend devuelve 'ADMIN' en mayúsculas)
  const isAdmin = user && (user.rol === 'ADMIN' || user.role === 'ADMIN' || user.type === 'ADMIN');
  
  if (!isAdmin) {
    console.warn('Acceso denegado: usuario no es admin', user);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
