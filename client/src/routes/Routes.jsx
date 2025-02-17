import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Importa Navigate

import Login from '../pages/Login';
import Register from '../pages/Register';
import Verify from '../pages/Verify';
import Thanks from '../pages/Thanks';
import DashClient from '../pages/DashClient';
import LandingPage from '../pages/LandingPage';
import Products from '../pages/Products';
import Cart from '../pages/Cart';
import Payment from '../pages/Payment';
import NewRepartidor from '../pages/NewRepartidor';
import NewProduct from '../pages/NewProduct';

// Componente ProtectedRoute
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />; // Usa Navigate para redirigir
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/thanks" element={<Thanks />} />
            <Route path="/landingpage" element={<LandingPage />} /> {/* Ruta pública */}

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
            <Route path="/payment" element={
                <ProtectedRoute>
                    <Payment />
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

            {/* Ruta por defecto (opcional) */}
            <Route path="*" element={<Navigate to="/login" />} /> {/* Redirige a /login si no encuentra la ruta */}

        </Routes>
    );
};

export default AppRoutes;