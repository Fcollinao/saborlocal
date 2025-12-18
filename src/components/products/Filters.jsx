import React from 'react';
import { ButtonGroup, Button, Badge } from 'react-bootstrap';

const Filters = ({
  categorias,
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  totalProductos,
}) => {
  const isAll = categoriaSeleccionada === 'Todos';

  const handleChange = (cat) => {
    setCategoriaSeleccionada(cat);
  };

  return (
    <div className="d-flex align-items-center justify-content-between mb-3">
      <ButtonGroup>
        <Button
          className={isAll ? 'filter-btn filter-btn-active' : 'filter-btn'}
          onClick={() => handleChange('Todos')}
        >
          Todos{' '}
          {typeof totalProductos === 'number' && (
            <Badge
              bg="light"
              text="dark"
              className="ms-1 filter-badge"
            >
              {totalProductos}
            </Badge>
          )}
        </Button>

        {categorias.map((cat) => {
          const active = categoriaSeleccionada === cat;
          return (
            <Button
              key={cat}
              className={active ? 'filter-btn filter-btn-active' : 'filter-btn'}
              onClick={() => handleChange(cat)}
            >
              {cat}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
};

export default Filters;
