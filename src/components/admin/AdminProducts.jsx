// src/components/admin/AdminProducts.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import {
  adminGetProducts,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
} from '../../services/adminService';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    productor: '',
    descripcion: '',
  });

  // Cargar productos
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await adminGetProducts();
      const productsArray = Array.isArray(data) ? data : (data.productos || data.products || []);
      setProducts(productsArray);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingId(product.id);
      // Normalizar productor si es un objeto
      const productorName = typeof product.productor === 'string' 
        ? product.productor 
        : (product.productor?.nombre || '');
      setForm({
        nombre: product.nombre || '',
        precio: product.precio || '',
        categoria: product.categoria || '',
        productor: productorName,
        descripcion: product.descripcion || ''
      });
    } else {
      setEditingId(null);
      setForm({ nombre: '', precio: '', categoria: '', productor: '', descripcion: '' });
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
        await adminUpdateProduct(editingId, form);
      } else {
        await adminCreateProduct(form);
      }
      loadProducts();
      handleCloseModal();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) return;
    try {
      setError('');
      await adminDeleteProduct(id);
      loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-section">
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h3>Gestión de Productos</h3>
        <Button variant="success" onClick={() => handleOpenModal()}>
          + Nuevo Producto
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
              <th>Precio</th>
              <th>Categoría</th>
              <th>Productor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.nombre || product.name}</td>
                <td>${product.precio || product.price}</td>
                <td>{product.categoria || product.category}</td>
                <td>
                  {product.productor ? 
                    (typeof product.productor === 'string' ? product.productor : product.productor.nombre)
                    : (product.producer || '-')}
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleOpenModal(product)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal para crear/editar */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId ? 'Editar Producto' : 'Nuevo Producto'}
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
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={form.precio}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Productor</Form.Label>
              <Form.Control
                type="text"
                name="productor"
                value={form.productor}
                onChange={handleChange}
                required
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

export default AdminProducts;
