// src/pages/Contact.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { sendContactMessage } from '../services/contactService';
import bannerImg from '../assets/Imagen-centro.png';

const Contact = () => {
  const [form, setForm] = useState({ nombre: '', correo: '', mensaje: '' });
  const [mensajeExito, setMensajeExito] = useState('');
  const [error, setError] = useState('');
  const [errores, setErrores] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.nombre.trim()) errs.nombre = 'El nombre es obligatorio.';
    if (!form.correo || !/\S+@\S+\.\S+/.test(form.correo)) errs.correo = 'Correo inválido.';
    if (!form.mensaje.trim()) errs.mensaje = 'El mensaje es obligatorio.';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const val = validate();
    
    if (Object.keys(val).length === 0) {
      setErrores({});
      setError('');
      setLoading(true);

      try {
        await sendContactMessage({
          nombre: form.nombre,
          email: form.correo,
          mensaje: form.mensaje,
        });
        
        setMensajeExito('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
        setForm({ nombre: '', correo: '', mensaje: '' });
      } catch (err) {
        setError(err.message || 'Error al enviar el mensaje. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    } else {
      setErrores(val);
      setMensajeExito('');
    }
  };

  return (
    <>
      {/* Banner superior igual que login */}
      <div
        className="forgot-banner"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="forgot-banner-inner">
          <h2>Contacto</h2>
          <p>
            <Link to="/" className="text-muted text-decoration-none">
              Inicio
            </Link>{' '}
            / <span>Contacto</span>
          </p>
        </div>
      </div>

      {/* Cuerpo, mismo layout de card centrada */}
      <main className="login-wrapper">
        <div className="login-panel">
          {mensajeExito && (
            <Alert className="mb-3" variant="success">
              {mensajeExito}
            </Alert>
          )}

          {error && (
            <Alert className="mb-3" variant="danger">
              {error}
            </Alert>
          )}

          <div className="border rounded bg-white p-4">
            <Form onSubmit={handleSubmit} noValidate>
             {/* NOMBRE */}
                <Row className="mb-3">
                  <Form.Label
                    htmlFor="nombre"                         // 👈 agregar
                    className="col-sm-3 col-form-label"
                  >
                    Nombre
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      id="nombre"                            // 👈 agregar
                      type="text"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      isInvalid={!!errores.nombre}
                      placeholder="Tu nombre completo"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errores.nombre}
                    </Form.Control.Feedback>
                  </Col>
                </Row>

                {/* CORREO */}
                <Row className="mb-3">
                  <Form.Label
                    htmlFor="correo"                         // 👈 agregar
                    className="col-sm-3 col-form-label"
                  >
                    Correo electrónico
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      id="correo"                            // 👈 agregar
                      type="email"
                      name="correo"
                      value={form.correo}
                      onChange={handleChange}
                      isInvalid={!!errores.correo}
                      placeholder="ejemplo@correo.cl"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errores.correo}
                    </Form.Control.Feedback>
                  </Col>
                </Row>

                {/* MENSAJE */}
                <Row className="mb-4">
                  <Form.Label
                    htmlFor="mensaje"                        // 👈 agregar
                    className="col-sm-3 col-form-label"
                  >
                    Mensaje
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      id="mensaje"                           // 👈 agregar
                      as="textarea"
                      rows={4}
                      name="mensaje"
                      value={form.mensaje}
                      onChange={handleChange}
                      isInvalid={!!errores.mensaje}
                      placeholder="Cuéntanos en qué podemos ayudarte"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errores.mensaje}
                    </Form.Control.Feedback>
                  </Col>
                </Row>


              <div className="text-end">
                <Button
                  type="submit"
                  className="btn-saborlocal px-4"
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar mensaje'}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
