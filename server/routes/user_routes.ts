import * as Express from 'express'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Echo } from 'twilio/lib/twiml/VoiceResponse';
import { authenticateJWT, authorizeAdmin, authorizeShipper, authorizeClient } from '../routes/authMiddleware';
import Stripe from 'stripe';

require('dotenv').config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = Express.Router();

import User from '../database/models/User';
import Order from '../database/models/Order';
import Product from '../database/models/Product';
import OrderDetail from '../database/models/OrderDetail';
import Payment from '../database/models/Payment';

router.get('/', (req, res) => {
    res.send("Hola mundo");
})

router.post('/register', async (req, res) => {
    const { name, email, password, address } = req.body;
    try {
        const existingUser = await User.findOne({where : {email: email}});

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                rol: 'Client',
                address,
                longitud: 0,
                latitud: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            res.status(201).json({ user });
        } else {
            res.status(400).json({ error: 'User already exists' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.post('/register/shipper', authenticateJWT, authorizeAdmin, async (req, res) => {
    const { name, email, password, address } = req.body;
    try {
        const existingUser = await User.findOne({where : {email: email}});

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                rol: 'Shipper',
                address,
                longitud: 0,
                latitud: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            res.status(201).json({ user });
        } else {
            res.status(400).json({ error: 'User already exists' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/register/admin', authenticateJWT, authorizeAdmin, async (req, res) => {
    const { name, email, password, address } = req.body;
    try {
        const existingUser = await User.findOne({where : {email: email}});

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                rol: 'Admin',
                address,
                longitud: 0,
                latitud: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            res.status(201).json({ user });
        } else {
            res.status(400).json({ error: 'User already exists' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({where : {email: email}});
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password)
            if (validPassword) {
                const token = jwt.sign({id: user.id, rol: user.rol}, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                })

                user.token = token;
                await user.save();

                res.status(200).json({ 'User token': token });
            } else {
                res.status(400).json({ error: 'Incorrect password' });
            }
        } else {
            res.status(400).json({ error: 'User not found, please register' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.get('/see/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        if (products) {
            res.status(200).json({ products });
        } else {
            res.status(400).json({ error: 'No products found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.post('/create/product', async (req, res) => {
    const { product_name, product_description, product_price } = req.body;
    try {
        const product = await Product.create({
            product_name,
            product_description,
            product_price,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        res.status(201).json({ product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.post('/stripe/create/payment', async(req, res) => {
    try {
        const { cart, user_id, shipper_id } = req.body;

        const totalAmount = cart.reduce((acc, item) => acc + item.product_price * item.quantity, 0);

        const user = await User.findByPk(user_id);
        const shipper = await User.findByPk(shipper_id);

        if (user && shipper) {
            const order = await Order.create({
                user_id,
                shipper_id,
                total_price: totalAmount,
                order_state: 'Pendant',
                createdAt: new Date(),
                updatedAt: new Date()
            })

            for (const item of cart) {
                const order_detail = await OrderDetail.create({
                    order_id:  order.id,
                    product_id: item.product_id, 
                    product_quantity: item.quantity, 
                    subtotal_price: item.product_price * item.quantity,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
            }

            const paymentIntent = await stripe.paymentIntents.create({
                amount: totalAmount * 100,
                currency: 'MXN',
                metadata: {
                    order_id: order.id
                }
            })

            res.status(201).json({ 'Orden creada con exito': order, paymentIntent})
        }
    } catch(error) {
        res.status(400).json({ error: error.message });
    }
})

router.post('/confirm/payment', async (req, res) => {
    try {
        const {order_id, payment_intent_id} = req.body;
        
        const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);

        if (paymentIntent.status === 'succeeded') {
            const order = await Order.findByPk(order_id);
            order.order_state = 'In Delivery';
            await order.save();

            res.status(200).json({ 'Order sent': order });
        } else {
            res.status(400).json({ error: 'Payment not confirmed' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.post('/cancel/order', async (req, res) => {
    try {
        const { order_id, payment_intent_id } = req.body;

        const order = await Order.findByPk(order_id);
        if (order.order_state !== 'Cancelled') {
            const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);
            if (paymentIntent.status === 'succeeded') {
                order.order_state = 'Cancelled';
                await order.save();

                const refund = await stripe.refunds.create({
                    payment_intent: paymentIntent.id
                })

                res.status(200).json({ 'Order cancelled': order, refund });
            } else {
                order.order_state = 'Cancelled';
                await order.save();
                res.status(200).json({ 'Order cancelled': order });
            }
        } else {
            res.status(400).json({ error: 'Order already cancelled' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

export default router;