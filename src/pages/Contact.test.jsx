// src/pages/Contact.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Contact from './Contact';

test('formulario muestra errores y luego mensaje de éxito', () => {
  render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Contact />
    </BrowserRouter>
  );

  const enviarBtn = screen.getByRole('button', { name: /enviar mensaje/i });

  // Enviar vacío
  fireEvent.click(enviarBtn);

  expect(screen.getByText(/El nombre es obligatorio/i)).toBeInTheDocument();
  expect(screen.getByText(/Correo inválido/i)).toBeInTheDocument();
  expect(screen.getByText(/El mensaje es obligatorio/i)).toBeInTheDocument();

  // Llenar campos
  fireEvent.change(screen.getByLabelText(/Nombre/i), {
    target: { value: 'Juan' },
  });
  fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
    target: { value: 'juan@mail.com' },
  });
  fireEvent.change(screen.getByLabelText(/Mensaje/i), {
    target: { value: 'Hola' },
  });

  fireEvent.click(enviarBtn);

  expect(
    screen.getByText(/mensaje enviado con éxito/i)
  ).toBeInTheDocument();
});
