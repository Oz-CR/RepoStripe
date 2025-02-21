import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3002/v0.0.1/api/see/products')
            .then(res => {
                setProducts(res.data.products);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.product_name} agregado al carrito`);
    };

    return (
        <div className="product-container">
            <h1>Lista de Productos</h1>
            <div className="product-row">
                {products.map((product, index) => (
                    <div className="product-card" key={index}>
                        <div className="product-image">
                            <img src={``} alt={product.product_name} />
                        </div>
                        <div className="product-details">
                            <h2>{product.product_name}</h2>
                            <p>{product.product_description}</p>
                            <p className="price">Precio: ${product.product_price}</p>
                            <button onClick={() => addToCart(product)} className="add-to-cart-btn">
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;