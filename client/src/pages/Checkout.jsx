"use client";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51Qu5vHCL2o5JpriUm5STxcccLXKp3xjL563FwQPcck1Q2wTBAuOkKi3jKVS9PLVCByWSQVXi1oRrS2dylu2nvDmK00bRhf4jFn");

const CheckoutForm = ({ cart, navigate }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handlePayment = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            console.error("Stripe.js o Elements no están listos.");
            alert("Stripe.js no se ha cargado correctamente.");
            return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            console.error("No se encuentra el CardElement.");
            alert("Error al procesar el pago. Inténtalo nuevamente.");
            return;
        }

        const totalAmount = cart.reduce((acc, item) => acc + item.product_price * item.quantity, 0);

        if (totalAmount < 10) {
            alert("El monto mínimo permitido para pago es 10 MXN.");
            return;
        }

        console.log("Creando método de pago...");
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            console.error("Error al crear el método de pago:", error);
            alert("Error al procesar el pago.");
            return;
        }

        console.log("Método de pago creado:", paymentMethod);

        try {
            const response = await fetch("http://localhost:3002/v0.0.1/api/stripe/create/payment", {
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
                alert("Pago realizado con éxito.");
                navigate("/thanks");
            } else {
                console.error("Error en la respuesta del servidor:", data.error);
                alert(data.error || "Error en el pago.");
            }
        } catch (error) {
            console.error("Error en la solicitud de pago:", error);
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

