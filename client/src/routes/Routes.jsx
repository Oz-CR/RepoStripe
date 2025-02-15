import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from '../pages/Login'
import Register from '../pages/Register'
import Verify from '../pages/Verify'
import Thanks from '../pages/Thanks'
import DashClient from '../pages/DashClient'
import LandingPage from '../pages/LandingPage'
import Products from '../pages/Products'
import Cart from '../pages/Cart'
import Payment from '../pages/Payment'

const AppRoutes = () => {
  return (
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/thanks' element={<Thanks />} />
        <Route path='/dashclient' element={<DashClient />} />
        <Route path='/landingpage' element={<LandingPage />} />
        <Route path='/products' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/payment' element={<Payment />} />
      </Routes>
  )
}

export default AppRoutes