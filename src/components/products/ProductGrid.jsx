import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductGrid = ({ productos, onAgregar }) => (
  <Row xs={1} sm={2} lg={3} className="g-3">
    {productos.map((p) => (
      <Col key={p.id}>
        <ProductCard
          producto={p}
          onAgregar={onAgregar}
        />
      </Col>
    ))}
  </Row>
);

export default ProductGrid;
