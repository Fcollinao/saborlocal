// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import bannerImg from '../assets/Imagen-centro.png';

const RegisterPage = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    emailConfirm: '',
    password: '',
    fechaNacimiento: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validaciones
    if (!form.nombre.trim()) {
      setError('El nombre es obligatorio.');
      setLoading(false);
      return;
    }

    if (!form.apellidos.trim()) {
      setError('Los apellidos son obligatorios.');
      setLoading(false);
      return;
    }

    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      setError('Ingresa un correo electrónico válido.');
      setLoading(false);
      return;
    }

    if (form.email !== form.emailConfirm) {
      setError('Los correos electrónicos no coinciden.');
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      setLoading(false);
      return;
    }

    try {
      const response = await register({
        nombre: form.nombre,
        apellidos: form.apellidos,
        email: form.email,
        password: form.password,
        fechaNacimiento: form.fechaNacimiento || null,
      });

      if (response.success || response.message) {
        alert('Cuenta creada correctamente. Por favor, inicia sesión.');
        navigate('/login');
      }
    } catch (err) {
      setError(err.message || 'Error en el registro. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Banner superior */}
      <div
        className="forgot-banner"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="forgot-banner-inner">
          <h2>Crear una cuenta</h2>
          <p>
            <Link to="/" className="link-saborlocal-soft">
              Inicio
            </Link>{' '}
            / <span>Crear una cuenta</span>
          </p>
        </div>
      </div>

      <main className="login-wrapper">
        <div className="login-panel">
          <div className="mb-4" style={{ fontSize: '0.95rem' }}>
            ¿Ya tiene una cuenta?{' '}
            <Link to="/login" className="link-saborlocal">
              ¡Inicie sesión!
            </Link>
          </div>

          {error && (
            <div className="alert alert-danger py-2 mb-3">
              {error}
            </div>
          )}

          <div className="border rounded bg-white p-4">
            <form onSubmit={handleSubmit} noValidate>
              {/* Nombre */}
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Nombre</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    placeholder="Tu nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Apellidos */}
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Apellidos</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    name="apellidos"
                    className="form-control"
                    placeholder="Tus apellidos"
                    value={form.apellidos}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">
                  Correo electrónico
                </label>
                <div className="col-sm-9">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="ejemplo@correo.cl"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Repite tu correo */}
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">
                  Confirmar correo
                </label>
                <div className="col-sm-9">
                  <input
                    type="email"
                    name="emailConfirm"
                    className="form-control"
                    placeholder="Repite tu correo"
                    value={form.emailConfirm}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Contraseña con MOSTRAR */}
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Contraseña</label>
                <div className="col-sm-9 d-flex">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="form-control"
                    placeholder="Mínimo 6 caracteres"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary ms-2"
                    style={{ whiteSpace: 'nowrap' }}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? 'OCULTAR' : 'MOSTRAR'}
                  </button>
                </div>
              </div>

              {/* Fecha de nacimiento */}
              <div className="mb-4 row">
                <label className="col-sm-3 col-form-label">
                  Fecha de nacimiento
                </label>
                <div className="col-sm-6">
                  <input
                    type="date"
                    name="fechaNacimiento"
                    className="form-control"
                    value={form.fechaNacimiento}
                    onChange={handleChange}
                  />
                </div>
                <div
                  className="col-sm-3 text-muted"
                  style={{ fontSize: '0.85rem' }}
                >
                  Opcional
                </div>
              </div>

              {/* Botón guardar */}
              <div className="text-center">
                <button 
                  type="submit" 
                  className="btn btn-dark px-5"
                  disabled={loading}
                >
                  {loading ? 'Registrando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default RegisterPage;
