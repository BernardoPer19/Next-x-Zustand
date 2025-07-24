import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { RegisterUser } from "../features/Auth/types/interfaces/userInterface";

export const permisionRoles = (...rolesPermitidos: Role[]) => {
    return (
        req: Request & { user?: RegisterUser },
        res: Response,
        next: NextFunction
    ) => {
        const userRol = req.user?.rol;

        if (!userRol || !rolesPermitidos.includes(userRol)) {
            res
                .status(403)
                .json({ message: "No tienes permisos para acceder a esta ruta" });
        }
        next();
    };
};