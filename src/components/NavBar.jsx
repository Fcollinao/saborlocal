// src/components/NavBar.jsx
import React, { useContext, useState } from 'react';
import {
  Navbar,
  Nav,
  Container,
  Modal,
  Button,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Cart from './products/Cart';
import '../App.css';

const NavBar = () => {
  const { carrito, auth, logout } = useContext(AppContext);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <Navbar className="navbar-saborlocal shadow-sm" expand="lg" variant="light">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-saborlocal">
            <div>
              <span className="brand-main">Sabor</span>
              <span className="brand-accent">Local</span>
            </div>
            <span className="brand-sub">
              Tienda artesanal de sabores locales
            </span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Inicio</Nav.Link>

              {/* Link simple a productos, sin dropdown */}
              <Nav.Link as={Link} to="/products">Productos</Nav.Link>

              <Nav.Link as={Link} to="/contact">Contacto</Nav.Link>
            </Nav>

            {/* Lado derecho: login + carrito */}
            <div className="d-flex align-items-center gap-3">
              {auth.isAuthenticated ? (
                <button
                  type="button"
                  className="icon-button minimal-text"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              ) : (
                <button
                  type="button"
                  className="icon-button minimal-text"
                  onClick={() => navigate('/login')}
                >
                  Iniciar sesión
                </button>
              )}

              <button
                type="button"
                className="icon-button position-relative"
                onClick={() => setShowCart(true)}
              >
                &#128722;
                {carrito.length > 0 && (
                  <span className="cart-badge">{carrito.length}</span>
                )}
              </button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showCart} onHide={() => setShowCart(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Mi Carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Cart />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCart(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavBar;
