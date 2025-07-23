import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
  errors?: any; // para errores de validación si quieres
}

export function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err); // Opcional: log para desarrollo

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    ...(err.errors && { errors: err.errors }), // Opcional, detalles de validación
  });
}
