// src/components/products/Cart.jsx
import React, { useContext, useState } from 'react';
import { Row, Col, Button, Modal, Form, Alert } from 'react-bootstrap';
import { AppContext } from '../../context/AppContext';

const Cart = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(AppContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    metodo: 'tarjeta'
  });
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const total = carrito.reduce((acc, item) => {
    const raw = item.precio ?? item.price ?? 0;
    return acc + Number(raw);
  }, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProceedToCheckout = () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    setShowCheckout(true);
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje('');

    // Validar campos
    if (!formData.nombre || !formData.email || !formData.direccion) {
      setMensaje('Por favor completa todos los campos requeridos');
      setLoading(false);
      return;
    }

    try {
      // Crear orden
      const orderData = {
        cliente: {
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          email: formData.email,
          telefono: formData.telefono,
          direccion: formData.direccion,
          ciudad: formData.ciudad,
          codigoPostal: formData.codigoPostal
        },
        productos: carrito.map(p => ({
          id: p.id,
          nombre: p.nombre || p.name,
          precio: p.precio || p.price,
          cantidad: 1
        })),
        total: total,
        metodo_pago: formData.metodo,
        fecha: new Date().toISOString()
      };

      console.log('📦 Orden a procesar:', orderData);

      // TODO: Integrar con endpoint de pago/pedidos
      // const response = await fetch('/api/pedidos', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(orderData)
      // });

      // Por ahora simular éxito
      setMensaje('¡Pago procesado exitosamente! Tu orden ha sido creada.');
      setTimeout(() => {
        vaciarCarrito();
        setShowCheckout(false);
        setFormData({
          nombre: '',
          apellidos: '',
          email: '',
          telefono: '',
          direccion: '',
          ciudad: '',
          codigoPostal: '',
          metodo: 'tarjeta'
        });
      }, 2000);
    } catch (error) {
      setMensaje('Error al procesar el pago. Intenta de nuevo.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (carrito.length === 0) {
    return <p>Tu carrito está vacío.</p>;
  }

  return (
    <>
      {carrito.map((item, index) => (
        <Row key={index} className="align-items-center mb-2">
          <Col xs={6}>{item.nombre || item.name}</Col>
          <Col xs={3} className="text-end">
            {`$${Number(item.precio ?? item.price).toLocaleString('es-CL')}`}
          </Col>
          <Col xs={3} className="text-end">
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => eliminarDelCarrito(index)}
            >
              Eliminar
            </Button>
          </Col>
        </Row>
      ))}

      <hr />

      <p className="mb-1">
        <strong>Total</strong>
      </p>
      <p className="mb-3">
        Monto a pagar:{' '}
        <strong>{`$${total.toLocaleString('es-CL')}`}</strong>
      </p>

      <Button
        variant="success"
        size="lg"
        className="w-100"
        onClick={handleProceedToCheckout}
      >
        💳 Proceder al pago
      </Button>

      {/* Modal de Checkout */}
      <Modal show={showCheckout} onHide={() => setShowCheckout(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Completar compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {mensaje && (
            <Alert variant={mensaje.includes('exitosamente') ? 'success' : 'danger'}>
              {mensaje}
            </Alert>
          )}

          <Form onSubmit={handleSubmitPayment}>
            <h5 className="mb-3">Datos de envío</h5>

            <Form.Group className="mb-3">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Juan"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apellidos *</Form.Label>
              <Form.Control
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                placeholder="Ej: Pérez García"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@correo.cl"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+56 9 1234 5678"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Dirección de envío *</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                placeholder="Ej: Calle Principal 123, Apto 5B"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                placeholder="Ej: Santiago"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Código postal</Form.Label>
              <Form.Control
                type="text"
                name="codigoPostal"
                value={formData.codigoPostal}
                onChange={handleChange}
                placeholder="Ej: 8320000"
              />
            </Form.Group>

            <h5 className="mb-3 mt-4">Método de pago</h5>

            <Form.Group className="mb-3">
              <Form.Check
                type="radio"
                label="Tarjeta de crédito/débito"
                name="metodo"
                value="tarjeta"
                checked={formData.metodo === 'tarjeta'}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Transferencia bancaria"
                name="metodo"
                value="transferencia"
                checked={formData.metodo === 'transferencia'}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="PayPal"
                name="metodo"
                value="paypal"
                checked={formData.metodo === 'paypal'}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="alert alert-info">
              <strong>Resumen de compra:</strong>
              <br />
              Artículos: {carrito.length}
              <br />
              Total: ${total.toLocaleString('es-CL')}
            </div>

            <Button
              variant="success"
              type="submit"
              className="w-100"
              size="lg"
              disabled={loading}
            >
              {loading ? 'Procesando...' : `💰 Pagar $${total.toLocaleString('es-CL')}`}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Cart;
