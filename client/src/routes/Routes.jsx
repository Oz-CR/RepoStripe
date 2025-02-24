import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; 

import Login from '../pages/Login';
import Register from '../pages/Register';
import Thanks from '../pages/Thanks';
import DashClient from '../pages/DashClient';
import LandingPage from '../pages/LandingPage';
import Products from '../pages/Products';
import Cart from '../pages/Cart';
import NewRepartidor from '../pages/NewRepartidor';
import NewProduct from '../pages/NewProduct';
import Checkout from '../pages/Checkout';
import Map from '../pages/Map';

// Componente ProtectedRoute
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('id');
    return token ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/thanks" element={<Thanks />} />
            <Route path="/landingpage" element={<LandingPage />} /> 
            <Route path="/map" element={<Map />} />
            

            {/* Rutas protegidas */}
            <Route path="/dashclient" element={
                <ProtectedRoute>
                    <DashClient />
                </ProtectedRoute>
            } />
            <Route path="/products" element={
                <ProtectedRoute>
                    <Products />
                </ProtectedRoute>
            } />
            <Route path="/cart" element={
                <ProtectedRoute>
                    <Cart />
                </ProtectedRoute>
            } />
            <Route path="/newrepartidor" element={
                <ProtectedRoute>
                    <NewRepartidor />
                </ProtectedRoute>
            } />
            <Route path="/newproduct" element={
                <ProtectedRoute>
                    <NewProduct />
                </ProtectedRoute>
            } />
            <Route path="/checkout" element={
                <ProtectedRoute>
                    <Checkout />
                </ProtectedRoute>
            } />
            
           

            {}
            <Route path="*" element={<Navigate to="/login" />} /> {}

        </Routes>
    );
};

export default AppRoutes;