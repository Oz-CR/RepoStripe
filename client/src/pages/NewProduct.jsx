import React from "react";
import axios from "axios";
import { useState } from "react";
import "../styles/login.css";

const NewProduct = () => {

    const [formData, setFormData] = useState({
      product_name: '',
      product_description: '',
      product_price: '',
    })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3005/v0.0.1/api/create/product', formData)
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
        <input type="text" placeholder="PRODUCT NAME" onChange={handleChange} name="product_name" value={formData.product_name} />
        <input type="text" placeholder="PRODUCT DESCRIPTION" onChange={handleChange} name="product_description" value={formData.product_description} />
        <input type="text" placeholder="PRODUCT PRICE" onChange={handleChange} name="product_price" value={formData.product_price} />
        <button type="submit">REGITER PRODUCT</button>
      </form>

      
    </div>
    </div>
  );
};

export default NewProduct;