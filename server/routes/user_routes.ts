import * as Express from 'express'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Echo } from 'twilio/lib/twiml/VoiceResponse';
import { authenticateJWT, authorizeAdmin, authorizeShipper, authorizeClient } from '../routes/authMiddleware';

require('dotenv').config();

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

router.post('/register/shipper', async (req, res) => {
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

router.post('/register/admin', async (req, res) => {
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

router.post('/create/product', authenticateJWT, authorizeAdmin, async (req, res) => {
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

router.post('/create/order', authenticateJWT, authorizeClient, async (req, res) => {
    const { user_id, shipper_id, product_id, product_quantity, subtotal_price } = req.body;
    try {
        const order = await Order.create({
            user_id,
            shipper_id,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const order_detail = await OrderDetail.create({
            order_id:  order.id,
            product_id, 
            product_quantity, 
            subtotal_price,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        res.status(201).json({ 'Orden creada con exito': order, order_detail })
    }catch(error){
        res.status(400).json({ error: error.message })
    }
})

router.post('/add-to-cart', authenticateJWT, authorizeClient, async (req, res) => {
    const {order_id, product_id, product_quantity, subtotal_price} = req.body;
    try {
        const order_detail = await OrderDetail.create({
            order_id,
            product_id,
            product_quantity,
            subtotal_price
        })

        res.status(201).json({ 'Producto anadido al carrito': order_detail })
    } catch(error) {
        res.status(400).json({ error: error.message })
    } 
})

export default router;