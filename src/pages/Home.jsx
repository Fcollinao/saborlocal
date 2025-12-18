// src/pages/Home.jsx
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import heroImg from '../assets/recorriendo-el-mundo-a-traves-de-los-sabores-locales.jpeg'; 

const Home = () => (
  <main>
    {/* Hero a pantalla ancha con imagen */}
    <section
      className="home-hero"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="home-hero-overlay">
        <Container>
          <div className="home-hero-content">
            <p className="home-kicker">
              Tienda artesanal de sabores locales
            </p>
            <h1 className="home-title">
              Bienvenidos a SaborLocal
            </h1>
            <p className="home-subtitle">
              Vive la experiencia de consumir productos de gran calidad y sabor.
              Apoya a emprendedores rurales adquiriendo productos de temporada
              y libres de conservantes.
            </p>
            <p className="home-subtitle-strong">
              ¡Descubre, saborea y comparte el verdadero sabor local!
            </p>

            <Button
              as={Link}
              to="/login"
              variant="success"
              className="mt-3 px-4 py-2"
            >
              Iniciar sesión
            </Button>
          </div>
        </Container>
      </div>
    </section>

    {/* Franja inferior simple */}
    <section className="home-strip">
      <Container>
        <p>
          Productos seleccionados con cariño.
        </p>
      </Container>
    </section>
  </main>
);

export default Home;

