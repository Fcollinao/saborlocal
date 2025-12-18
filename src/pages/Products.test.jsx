// src/pages/Products.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Products from './Products';
import { AppProvider } from '../context/AppContext';

const renderWithContext = (ui) =>
  render(<AppProvider>{ui}</AppProvider>);

test('muestra el título del catálogo en la página de productos', () => {
  renderWithContext(<Products />);

  // El título lo usas tanto en el banner como en el contenido
  const titulo = screen.getAllByText(/Catálogo SaborLocal/i);
  expect(titulo.length).toBeGreaterThan(0);
});

test('muestra los filtros de productos', () => {
  renderWithContext(<Products />);

  // Hay al menos un botón "Todos" (puede haber más de uno)
  const todosButtons = screen.getAllByText(/Todos/i);
  expect(todosButtons.length).toBeGreaterThan(0);
});