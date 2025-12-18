import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '../../context/AppContext';
import Cart from './Cart';

const customRender = (ui) =>
  render(<AppProvider>{ui}</AppProvider>);

test('muestra productos y permite eliminar uno', () => {
  // Estado inicial simulado a través de localStorage
  window.localStorage.setItem(
    'saborlocal_cart',
    JSON.stringify([
      { nombre: 'Queso Fresco', precio: 2500 },
      { nombre: 'Pan', precio: 1000 },
    ])
  );

  customRender(<Cart />);

  expect(screen.getByText(/Queso Fresco/i)).toBeInTheDocument();
  expect(screen.getByText(/Pan/i)).toBeInTheDocument();

  const eliminarButtons = screen.getAllByRole('button', { name: /eliminar/i });
  fireEvent.click(eliminarButtons[0]);

  expect(screen.queryByText(/Queso Fresco/i)).not.toBeInTheDocument();
  expect(screen.getByText(/Pan/i)).toBeInTheDocument();
});
