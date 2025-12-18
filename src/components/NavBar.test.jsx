// src/components/NavBar.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import NavBar from './NavBar';

test('NavBar muestra nombre y enlaces', () => {
  const mockContext = {
    carrito: [],
    auth: { isAuthenticated: false, user: null },
  };

  render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContext.Provider value={mockContext}>
        <NavBar />
      </AppContext.Provider>
    </BrowserRouter>
  );

  // Marca: comprobar el bloque completo "Sabor Local"
  expect(
    screen.getByText((text, element) =>
      element.classList.contains('brand-main') && text.includes('Sabor')
    )
  ).toBeInTheDocument();

  expect(
    screen.getByText((text, element) =>
      element.classList.contains('brand-accent') && text.includes('Local')
    )
  ).toBeInTheDocument();

  expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
  expect(screen.getByText(/Productos/i)).toBeInTheDocument();
  expect(screen.getByText(/Contacto/i)).toBeInTheDocument();
});
