"use client"
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [cardNumber, setCardNumber] = useState("");
    const [expDate, setExpDate] = useState("");
    const [cvc, setCvc] = useState("");

    useEffect(() => {
        if (location.state?.cart) {
            setCart(location.state.cart);
        }
    }, [location.state]);

    const handlePayment = async () => {
        const totalAmount = cart.reduce((acc, item) => acc + item.product_price * item.quantity, 0);

        if (totalAmount < 10) {
            alert("El monto mínimo permitido para pago es 10 MXN.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3002/v0.0.1/api/stripe/create/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cart,
                    user_id: localStorage.getItem('id'),
                    shipper_id: 2
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Pago realizado con éxito.");
                navigate("/thanks");
            } else {
                alert(data.error || "Error en el pago.");
            }
        } catch (error) {
            alert("Error al procesar el pago.");
        }
    };

    return (
        <div className="payment-container">
            <h1>Pago con Tarjeta</h1>
            <input
                type="text"
                placeholder="Número de tarjeta"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
            />
            <input
                type="text"
                placeholder="Fecha de expiración (MM/YY)"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
            />
            <input
                type="text"
                placeholder="CVC"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
            />
            <button onClick={handlePayment}>Pagar</button>
        </div>
    );
};

export default Checkout;
