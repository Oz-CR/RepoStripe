import React from 'react'
import "../styles/login.css"
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/v0.0.1/api/register', formData)
      .then(res => {
        navigate('/login')
      })
      .catch(err => {
        console.log(err)
      })
  }

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

      <form className="login-form" onSubmit={handleSubmit}>
        <input type="email" placeholder="EMAIL ADDRESS"  onChange={handleChange} name="email" value={formData.email} />
        <input type="password" placeholder="PASSWORD" onChange={handleChange} name="password" value={formData.password} />
        <input type="text" placeholder="ADDRESS" onChange={handleChange} name="address" value={formData.address} />
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