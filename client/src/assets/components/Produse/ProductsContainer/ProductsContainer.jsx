import React from "react";
import { Link } from "react-router-dom";

const ProductsContainer = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>Nu sunt produse disponibile.</p>;
  }

  return (
    <section className="products-container">
      {products.map((product) => (
        <article key={product._id || product.id}>
          <img src={product.img} alt={product.title} />
          <div className="titles">
            <h2>{product.title}</h2>
            {product.subtitle && <h3>{product.subtitle}</h3>}
          </div>
          <div className="price-container">
            <p className="price">{product.price}</p>
            {product.price2 && <p className="price">{product.price2}</p>}
          </div>
          <Link to={`/produse/produs/${product._id || product.id}`}>
            Vezi detalii
          </Link>
        </article>
      ))}
    </section>
  );
};

export default ProductsContainer;
