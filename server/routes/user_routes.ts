import * as Express from 'express'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Echo } from 'twilio/lib/twiml/VoiceResponse';
require('dotenv').config();

const router = Express.Router();

router.get('/', (req, res) => {
    res.send("Hola mundo");
})

export default router;