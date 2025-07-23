// authUtils.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const comparePassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    const comparedPassword = await bcrypt.compare(password, hashedPassword);
    return comparedPassword;
};

export const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};

export const createToken = (user: any): string => {
    const jwtSecret = process.env.JWT_PASSWORD;
    if (!jwtSecret) {
        throw new Error("JWT_PASSWORD environment variable is not defined");
    }

    const token = jwt.sign(
        {

        },
        jwtSecret,
        { expiresIn: "24h" }
    );
    return token;
};