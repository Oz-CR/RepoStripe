import React from 'react'
import "../styles/login.css"
import { NavLink } from 'react-router-dom'

const Register = () => {
  return (
    <div className="container">
    <div className="background-shapes">
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>
      <span className="cross cross-1">+</span>
      <span className="cross cross-2">+</span>
    </div>

    <div className="login-container">
      <h1 className="logo">misteba</h1>

      <form className="login-form">
        <input type="email" placeholder="EMAIL ADDRESS" />
        <input type="password" placeholder="PASSWORD" />
        <button type="submit">REGISTER</button>
      </form>

      <a className="forgot-password">
        <NavLink to="/login">Tienes cuenta? Inicia sesión</NavLink>
      </a>
    </div>
    </div>
  )
}

export default Register