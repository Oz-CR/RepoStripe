import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET as string;

interface AuthRequest extends Request {
    user?: {id: number; rol:string}; // Agregar el usuario autenticado a la request
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Tomar el token del header

    if (!token) {
        res.status(403).json({ error: 'Access denied, token missing' });
        return
    }

    try {
        const decoded = jwt.verify(token, secret) as {id: number; rol:string};
        req.user = decoded; // Guardar los datos del usuario en la request
        console.log(req.user);
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
        return
    }
};

export const authorizeClient = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.rol !== 'Client') {
        res.status(403).json({error: 'Access denied, only the client is authorized'})
        return
    }
    next();
}
export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.rol !== 'Admin') {
        res.status(403).json({ error: 'Access denied, only admins are authorized' });
        return
    }
    next();
};

export const authorizeShipper = (req: AuthRequest, res: Response, next: NextFunction) => {
    if(req.user?.rol === 'Admin') {
        next();
    }

    if (req.user?.rol !== 'Shipper') {
        res.status(403).json({ error: 'Access denied, only shippers are authorized' });
        return
    }
    next();
};