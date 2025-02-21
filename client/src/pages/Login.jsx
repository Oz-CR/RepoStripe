import React, { useState } from 'react';
import "../styles/login.css";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const res = await axios.post('http://localhost:3002/v0.0.1/api/login', formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
            
      if (res.data && res.data.id) {
        // Guarda el ID en localStorage
        localStorage.setItem('id', res.data.id);
        console.log('ID guardado en localStorage:', res.data.id);
    } else {
        console.error('La respuesta del servidor no contiene un ID.');
    }
    
      navigate('/dashclient'); 

    } catch (err) {
      console.log(err.response?.data || err); 
    }
  };

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
          <input 
            type="email" 
            name="email" 
            placeholder="EMAIL ADDRESS" 
            value={formData.email} 
            onChange={handleChange} 
            required
          />
          <input 
            type="password" 
            name="password" 
            placeholder="PASSWORD" 
            value={formData.password} 
            onChange={handleChange} 
            required
          />
          <button type="submit">LOG IN</button>
        </form>

        <a className="forgot-password">
          <NavLink to="/register">No tienes cuenta? Regístrate</NavLink>
        </a>
      </div>
    </div>
  );
};

export default Login;
