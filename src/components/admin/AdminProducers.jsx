// src/components/admin/AdminProducers.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import {
  adminGetProducers,
  adminCreateProducer,
  adminUpdateProducer,
  adminDeleteProducer,
} from '../../services/adminService';

const AdminProducers = () => {
  const [producers, setProducers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    ubicacion: '',
    descripcion: '',
  });

  useEffect(() => {
    loadProducers();
  }, []);

  const loadProducers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await adminGetProducers();
      const producersArray = Array.isArray(data) ? data : (data.productores || data.producers || []);
      setProducers(producersArray);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (producer = null) => {
    if (producer) {
      setEditingId(producer.id);
      // Normalizar datos (ignorar campos que no usamos)
      setForm({
        nombre: producer.nombre || '',
        email: producer.email || '',
        telefono: producer.telefono || '',
        ubicacion: producer.ubicacion || '',
        descripcion: producer.descripcion || ''
      });
    } else {
      setEditingId(null);
      setForm({ nombre: '', email: '', telefono: '', ubicacion: '', descripcion: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      if (editingId) {
        await adminUpdateProducer(editingId, form);
      } else {
        await adminCreateProducer(form);
      }
      loadProducers();
      handleCloseModal();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este productor?')) return;
    try {
      setError('');
      await adminDeleteProducer(id);
      loadProducers();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-section">
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h3>Gestión de Productores</h3>
        <Button variant="success" onClick={() => handleOpenModal()}>
          + Nuevo Productor
        </Button>
      </div>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Ubicación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {producers.map((producer) => (
              <tr key={producer.id}>
                <td>{producer.id}</td>
                <td>{producer.nombre}</td>
                <td>{producer.email}</td>
                <td>{producer.telefono}</td>
                <td>{producer.ubicacion}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleOpenModal(producer)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(producer.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId ? 'Editar Productor' : 'Nuevo Productor'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control
                type="text"
                name="ubicacion"
                value={form.ubicacion}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              {editingId ? 'Actualizar' : 'Crear'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminProducers;
