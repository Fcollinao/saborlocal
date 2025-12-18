// src/pages/Products.jsx
import React, { useContext, useMemo, useState, useEffect } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { getProducts, getCategories } from '../services/productsService';
import { getProductImage } from '../data/productImages';
import { AppContext } from '../context/AppContext';
import Filters from '../components/products/Filters';
import ProductGrid from '../components/products/ProductGrid';
import bannerImg from '../assets/Imagen-centro.png';

const Products = () => {
  const { agregarAlCarrito } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar productos y extraer categorías
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError('');
        
        const productsData = await getProducts();
        const productosArray = Array.isArray(productsData) ? productsData : productsData.productos || [];
        
        // Agregar imagen a cada producto
        const productosConImagen = productosArray.map(p => ({
          ...p,
          imagen: getProductImage(p.nombre)
        }));
        
        setProducts(productosConImagen);
        
        // Extraer categorías únicas de los productos
        const categorias = await getCategories(productosConImagen);
        setCategories(categorias);
      } catch (err) {
        setError('Error al cargar los productos. Por favor, intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const productosFiltrados = useMemo(() => {
    if (categoriaSeleccionada === 'Todos') return products;
    return products.filter((p) => {
      const cat = p.categoria || p.category || '';
      return cat.toString().toLowerCase() === categoriaSeleccionada.toLowerCase();
    });
  }, [categoriaSeleccionada, products]);

  const handleAgregar = (producto) => {
    agregarAlCarrito(producto);
  };

  return (
    <main>
      {/* Banner superior */}
      <div
        className="forgot-banner"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="forgot-banner-inner">
          <h2>Catálogo SaborLocal</h2>
          <p className="text-muted mb-0">
            Productos artesanales de café, lácteos, conservas, panadería, especias y más.
          </p>
        </div>
      </div>

      {/* Contenido del catálogo */}
      <Container className="mt-4 mb-5">
        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}

        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
            <div className="text-center">
              <Spinner animation="border" role="status" className="mb-3" />
              <p>Cargando productos...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="catalog-filters mb-4">
              <Filters
                categorias={['Todos', ...categories]}
                categoriaSeleccionada={categoriaSeleccionada}
                setCategoriaSeleccionada={setCategoriaSeleccionada}
                totalProductos={products.length}
              />
            </div>

            {productosFiltrados.length === 0 ? (
              <Alert variant="info">
                No hay productos en esta categoría.
              </Alert>
            ) : (
              <ProductGrid
                productos={productosFiltrados}
                onAgregar={handleAgregar}
              />
            )}
          </>
        )}
      </Container>
    </main>
  );
};

export default Products;
