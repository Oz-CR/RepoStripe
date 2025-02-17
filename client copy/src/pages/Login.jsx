import React, { useState } from 'react';
import "../styles/login.css";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Usa useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/v0.0.1/api/login', formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      // Guarda el token en localStorage
      localStorage.setItem('token', res.data.token);

      // Redirige al usuario
      navigate('/dashclient');

    } catch (err) {
      console.error("Error en el login:", err.response?.data || err); // Mejor manejo de errores
      // Muestra el error al usuario (ej: con un estado de error y un mensaje)
       if (err.response?.data.message) {
        alert(err.response?.data.message)
       }else{
        alert("Credenciales incorrectas")
       }
    }
  };

  // ... (resto del componente sin cambios)
};

export default Login;