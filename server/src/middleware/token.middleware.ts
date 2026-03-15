import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
    userId?: string;
}

const MidVerifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    const jwt_secret_key = process.env.JWT_SECRET ?? ''

    if (!token) return res.status(401).json({ message: 'Access refused' });

    try {
        const decoded: any = jwt.verify(token, jwt_secret_key);
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

export = MidVerifyToken;