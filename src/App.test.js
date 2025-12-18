// src/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('muestra la home de SaborLocal', () => {
  render(<App />);
  expect(screen.getByText(/Bienvenidos a SaborLocal/i)).toBeInTheDocument();
});
