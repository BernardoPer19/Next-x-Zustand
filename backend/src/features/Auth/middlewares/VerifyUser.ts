import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { RegisterUser } from "../types/interfaces/userInterface";

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies.access_token;

    if (!token) {
        res.status(401).json({ message: "No autorizado: Token no proporcionado" });
        return
    }

    try {
        const jwtSecret = process.env.JWT_PASSWORD;
        if (!jwtSecret) {
            res.status(500).json({ message: "Error de configuración del servidor" });
            return
        }

        const decoded = jwt.verify(token, jwtSecret) as RegisterUser;

        req.user = decoded;

        next();
    } catch (err) {
        res.status(401).json({ message: "Token inválido o expirado" });
        return
    }
};