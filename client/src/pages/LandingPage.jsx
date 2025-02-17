import React from 'react'
import "../styles/landingpage.css"


const LandingPage = () => {
  return (
    <main>
    <section className="hero">
      <div className="hero-content">
        <h2>Los mejores productos tecnológicos</h2>
        <p>No te pierdas la oportunidad de disfrutar de nuestros productos de la mejor calidad.</p>
        <button className="cta-button">Ver catalogo</button>
      </div>
      <div className="hero-image"></div>
    </section>

    <section className="featured-categories">
      <h3>Nuestras categorias</h3>
      <div className="category-grid">
        {["Celulares", "Laptops", "TV", "Accessories"].map((category, index) => (
          <div key={index} className="category-card">
            <div className="category-image"></div>
            <h4>{category}</h4>
          </div>
        ))}
      </div>
    </section>

    <section className="trending">
      <h3>Trending Now</h3>
      <div className="product-slider">
        {["Product 1", "Product 2", "Product 3", "Product 4"].map((product, index) => (
          <div key={index} className="product-card">
            <div className="product-image"></div>
            <h4>{product}</h4>
            <p>$79.99</p>
            <button>Ver en catalogo</button>
          </div>
        ))}
      </div>
    </section>
  </main>

  )
}

export default LandingPage