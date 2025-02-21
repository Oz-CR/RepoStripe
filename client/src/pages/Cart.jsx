"use client"
import { useEffect, useState } from "react"
import "../styles/cart.css"
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const [cart, setCart] = useState([])

  const navigate = useNavigate()

  const HandleCheckout = () => {
    navigate('/checkout', { state: { cart } });
  };
  

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || []
    setCart(storedCart)
  }, [])

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    setCart(updatedCart)
  }

  const updateQuantity = (id, amount) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + amount) }
      }
      return item
    })
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    setCart(updatedCart)
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p className="empty-cart">El carrito está vacío</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              <div className="item-details">
                <h3 className="item-name">{item.product_name}</h3>
                <p className="item-description">{item.product_description}</p>
                <p className="item-price">Precio: ${item.product_price}</p>
              </div>
              <div className="item-actions">
                <div className="quantity-control">
                  <button className="quantity-btn" onClick={() => updateQuantity(item.id, -1)}>
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button className="quantity-btn" onClick={() => updateQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={HandleCheckout}>Realizar Orden</button>

    </div>
  )
}

export default Cart

