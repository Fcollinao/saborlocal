// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { Container, Nav, Tab } from 'react-bootstrap';
import AdminProducts from '../components/admin/AdminProducts';
import AdminProducers from '../components/admin/AdminProducers';
import AdminUsers from '../components/admin/AdminUsers';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('productos');

  return (
    <main className="admin-dashboard">
      <Container fluid className="py-4">
        <div className="admin-header mb-4">
          <h1>🔐 Panel de Administración</h1>
          <p className="text-muted">Gestiona productos, productores y usuarios</p>
        </div>

        <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Nav variant="tabs" className="mb-4 admin-nav">
            <Nav.Item>
              <Nav.Link eventKey="productos" className="admin-nav-link">
                📦 Productos
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="productores" className="admin-nav-link">
                👨‍🌾 Productores
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="usuarios" className="admin-nav-link">
                👥 Usuarios
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="productos">
              <AdminProducts />
            </Tab.Pane>
            <Tab.Pane eventKey="productores">
              <AdminProducers />
            </Tab.Pane>
            <Tab.Pane eventKey="usuarios">
              <AdminUsers />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </main>
  );
};

export default AdminDashboard;
