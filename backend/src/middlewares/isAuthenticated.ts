import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string;
}

export function isAuthenticated(
    req: Request & { user_id?: string },
    res: Response,
    next: NextFunction
) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({ message: "Autenticação requer um token" });
    }

    const token = authToken.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Formato de token inválido" });
    }

    try {
        const { sub } = verify(token, process.env.JWT_SECRET!) as Payload;
        req.user_id = sub;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
}
