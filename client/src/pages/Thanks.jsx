import React from 'react'
import "../styles/thanks.css"
import { NavLink } from 'react-router-dom'

const Thanks = () => {
  return (
    <div className="container">
      <main className="main">
        <h1 className="title">Gracias por tu compra!</h1>
        <p className="description">Estamos agradecidos por tu compra. Recibirás un correo electrónico con más información sobre tu pedido.</p>
        <a href="/" className="button">
        <NavLink to="/landingpage">
        Volver a la página de inicio
        </NavLink>
        </a>
      </main>
    </div>
  )
}

export default Thanks