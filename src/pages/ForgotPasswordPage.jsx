// src/pages/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bannerImg from '../assets/Imagen-centro.png';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la llamada real al backend
    setMensaje(
      'Si el correo existe en el sistema, recibirá un enlace para restablecer su contraseña.'
    );
  };

  return (
    <>
      {/* Banner largo */}
      <div
        className="forgot-banner"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="forgot-banner-inner">
          <h2>¿Olvidó su contraseña?</h2>
          <p>
            <Link to="/" className="link-saborlocal-soft">
                Inicio
                </Link>{' '}
                / <span className="link-saborlocal-soft">Restablecer su contraseña</span>
          </p>
        </div>
      </div>

      {/* Contenido central */}
      <main className="login-wrapper">
        <div className="login-panel">
          {mensaje && (
            <div className="alert alert-info py-2 mb-3">
              {mensaje}
            </div>
          )}

          <div className="border rounded bg-white p-4">
            <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>
              Por favor, introduzca la dirección de correo electrónico que utilizó
              para registrarse. Recibirá un enlace temporal para restablecer su
              contraseña.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4 row">
                <label className="col-sm-3 col-form-label">
                  Dirección de correo electrónico
                </label>
                <div className="col-sm-9">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="ejemplo@correo.cl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-dark px-4">
                  Enviar enlace de restablecimiento de contraseña
                </button>
              </div>
            </form>
          </div>

          <div className="mt-4">
            <Link to="/login" className="btn btn-outline-dark">
              ← Volver a inicio de sesión
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default ForgotPasswordPage;
