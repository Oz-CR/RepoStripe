import React from "react";
import axios from "axios";
import { useState } from "react";
import "../styles/login.css";

const NewRepartidor = () => {

    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      address: '',
    })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/v0.0.1/api/register/shipper', formData)
      .then(res => {
        console.log(res.data)
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
        <button type="submit">REGITER SHIPPER</button>
      </form>

      
    </div>
    </div>
  );
};

export default NewRepartidor;