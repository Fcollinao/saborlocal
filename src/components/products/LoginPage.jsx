import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../services/authService';
import { useAuthActions } from '../hooks/useAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldError, setFieldError] = useState('');
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
      navigate('/products');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '65vh' }}>
      <div className="form-panel" style={{ maxWidth: 380, width: '100%' }}>
        <h2 className="mb-3">Iniciar sesión</h2>
        <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>
          Accede al panel de administración de productos de SaborLocal.
        </p>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="loginEmail">Correo electrónico</label>
            <input
              id="loginEmail"
              type="email"
              className="form-control"
              placeholder="ejemplo@correo.cl"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {fieldError && (
              <div className="form-error">
                {fieldError}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="loginPassword">Contraseña</label>
            <input
              id="loginPassword"
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
