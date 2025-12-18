// src/components/admin/AdminUsers.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import {
  adminGetUsers,
  adminUpdateUser,
  adminDeleteUser,
} from '../../services/adminService';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    rol: 'customer',
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await adminGetUsers();
      const usersArray = Array.isArray(data) ? data : (data.usuarios || data.users || []);
      setUsers(usersArray);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingId(user.id);
      // Normalizar datos (ignorar campos que no usamos)
      setForm({
        nombre: user.nombre || '',
        email: user.email || '',
        rol: user.rol || 'customer'
      });
    } else {
      setEditingId(null);
      setForm({ nombre: '', email: '', rol: 'customer' });
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
        await adminUpdateUser(editingId, form);
      }
      loadUsers();
      handleCloseModal();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) return;
    try {
      setError('');
      await adminDeleteUser(id);
      loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-section">
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h3>Gestión de Usuarios</h3>
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
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nombre}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.rol === 'admin' ? 'bg-danger' : 'bg-secondary'
                    }`}
                  >
                    {user.rol}
                  </span>
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleOpenModal(user)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
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
          <Modal.Title>Editar Usuario</Modal.Title>
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
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select
                name="rol"
                value={form.rol}
                onChange={handleChange}
                required
              >
                <option value="customer">Cliente</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Actualizar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminUsers;
