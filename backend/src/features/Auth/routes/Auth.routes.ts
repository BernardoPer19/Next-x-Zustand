import { Router } from "express";
import { useAuth } from "../controllers/AuthController";



export const authRouter = Router()

authRouter.post("/register", useAuth.register)
authRouter.post("/login", useAuth.login)





