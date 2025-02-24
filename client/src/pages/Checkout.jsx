"use client";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51QuH23C6lJGZEwlfWk1j1EvpHNSyVaxgq5E3gi5RmiNRmeUpLSQl6TgzVXPzZCDHFwzux8dEJcGo2caaQUGoYFqq00lOrxiFWL");

const CheckoutForm = ({ cart, navigate }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handlePayment = async (event) => {
        event.preventDefault();
    
        // Validar Stripe y elementos
        if (!stripe || !elements) {
            alert("Stripe.js no está cargado correctamente.");
            return;
        }
    
        // Obtener el método de pago
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });
    
        if (error) {
            alert("Error en el pago.");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:3005/v0.0.1/api/stripe/create/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cart,
                    user_id: localStorage.getItem("id"),
                    shipper_id: 2,
                    payment_method_id: paymentMethod.id,
                }),
            });
    
            const data = await response.json();
            if (response.ok) {
                alert("Pago exitoso. El repartidor está en camino.");
                
                // Redirigir al mapa con el repartidor activo
                navigate("/map");
            } else {
                alert(data.error || "Error en el pago.");
            }
        } catch (error) {
            alert("Error al procesar el pago.");
        }
    };

    return (
        <form onSubmit={handlePayment}>
            <CardElement />
            <button type="submit" disabled={!stripe || !elements}>Pagar</button>
        </form>
    );
};

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (location.state?.cart) {
            setCart(location.state.cart);
        }
    }, [location.state]);

    return (
        <div className="payment-container">
            <h1>Pago con Tarjeta</h1>
            <Elements stripe={stripePromise}>
                <CheckoutForm cart={cart} navigate={navigate} />
            </Elements>
        </div>
    );
};

export default Checkout;

