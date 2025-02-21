import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Cargar la clave pública de Stripe
const stripePromise = loadStripe('pk_test_51Qu5vHCL2o5JpriUm5STxcccLXKp3xjL563FwQPcck1Q2wTBAuOkKi3jKVS9PLVCByWSQVXi1oRrS2dylu2nvDmK00bRhf4jFn');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </BrowserRouter>
  </StrictMode>,
);
