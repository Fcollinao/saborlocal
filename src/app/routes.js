// src/routes/AppRoutes.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Contact from '../pages/Contact';
import LoginPage from '../pages/LoginPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import RegisterPage from '../pages/RegisterPage';
import AdminDashboard from '../pages/AdminDashboard';
import PrivateRoute from '../components/PrivateRoute';
import AdminRoute from '../components/AdminRoute';
import NavBar from '../components/NavBar';

const AppRoutes = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <NavBar />
    <Routes>
      {/* Inicio */}
      <Route path="/" element={<Home />} />

      {/* Autenticación */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/register" element={<RegisterPage />} />  {/* <--- ruta registro */}

      {/* Productos sin protección por ahora */}
      <Route path="/products" element={<Products />} />

      {/* Contacto */}
      <Route path="/contact" element={<Contact />} />

      {/* Admin - Solo para administradores */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;

