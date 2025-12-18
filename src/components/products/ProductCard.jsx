import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

const ProductCard = ({ producto, onAgregar }) => {
  const nombre = producto.nombre || producto.name;
  const categoria = producto.categoria || producto.category;
  const productor = producto.productor || producto.producer;
  const precioRaw = producto.precio ?? producto.price;
  const imagen = producto.imagen || producto.imageUrl;

  // Extraer nombre del productor si es un objeto
  const productorNombre = typeof productor === 'string' 
    ? productor 
    : (productor?.nombre || productor?.name || 'Desconocido');

  return (
    <Card className="h-100 shadow-sm card-hover product-card">
      {imagen && (
        <Card.Img
          variant="top"
          src={imagen}
          alt={`Imagen de ${nombre}`}
          loading="lazy"
          style={{ objectFit: 'cover', height: 180 }}
        />
      )}

      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title
            className="mb-0"
            style={{ fontSize: '1rem', lineHeight: 1.2 }}
          >
            {nombre}
          </Card.Title>
          {categoria && <Badge bg="secondary">{categoria}</Badge>}
        </div>

        <Card.Text
          className="text-muted mb-3"
          style={{ fontSize: '0.9rem' }}
        >
          {productorNombre && (
            <>
              <strong>Productor:</strong> {productorNombre}
              <br />
            </>
          )}
          <strong>Precio:</strong>{' '}
          {precioRaw !== undefined
            ? `$${Number(precioRaw).toLocaleString('es-CL')}`
            : '—'}
        </Card.Text>

        <Button
          variant="primary"
          className="mt-auto"
          onClick={() => onAgregar(producto)}
          aria-label={`Agregar ${nombre} al carrito`}
        >
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
