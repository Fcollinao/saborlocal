// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../services/authService';
import { useAuthActions } from '../hooks/useAuth';
import bannerImg from '../assets/Imagen-centro.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [showPassword, setShowPassword] = useState(false);   // <--- NUEVO
  const { login } = useAuthActions();
  const navigate = useNavigate();

  const validarEmail = (value) => /\S+@\S+\.\S+/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldError('');

    if (!validarEmail(email)) {
      setFieldError('Ingresa un correo electrónico válido.');
      return;
    }

    try {
      const data = await apiLogin({ email, password });
      login({ email: data.email, rol: data.rol }, data.token);
      
      // Si es admin, redirigir a panel de admin, sino a home
      const rol = data.rol || data.role || data.type;
      if (rol === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <>
      {/* Banner superior con la misma imagen */}
      <div
        className="forgot-banner"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="forgot-banner-inner">
          <h2>Iniciar sesión con su cuenta</h2>
          <p>
            <Link to="/" className="text-muted text-decoration-none">
              Inicio
            </Link>{' '}
            / <span>Iniciar sesión con su cuenta</span>
          </p>
        </div>
      </div>

      <main className="login-wrapper">
        <div className="login-panel">
          {error && <div className="alert alert-danger py-2">{error}</div>}

          {/* Panel blanco del formulario */}
          <div className="border rounded bg-white p-4">
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">
                  Dirección de correo electrónico
                </label>
                <div className="col-sm-9">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="ejemplo@correo.cl"
                    value={email}
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {fieldError && (
                    <div
                      className="text-danger mt-1"
                      style={{ fontSize: '0.85rem' }}
                    >
                      {fieldError}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-2 row">
                <label className="col-sm-3 col-form-label">Contraseña</label>
                <div className="col-sm-9 d-flex">
                  <input
                    type={showPassword ? 'text' : 'password'}   // <--- usa el estado
                    className="form-control"
                    placeholder="••••••••"
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary ms-2"
                    style={{ whiteSpace: 'nowrap' }}
                    onClick={() => setShowPassword((prev) => !prev)} // <--- toggle
                  >
                    {showPassword ? 'OCULTAR' : 'MOSTRAR'}
                  </button>
                </div>
              </div>

              <div className="mb-4 text-center">
                <Link
                  to="/forgot-password"
                  className="link-saborlocal-soft"
                  style={{ fontSize: '0.9rem' }}
                >
                  ¿Olvidó su contraseña?
                </Link>
              </div>

              <div className="text-center mb-3">
                <button type="submit" className="btn btn-dark px-5">
                  Iniciar sesión
                </button>
              </div>

              <div className="text-center" style={{ fontSize: '0.9rem' }}>
                ¿No tiene una cuenta?{' '}
                <Link
                  to="/register"
                  className="link-saborlocal-soft"
                >
                  Cree una aquí
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
