import { prisma } from "../../../config/prisma";
import { RegisterTypeSchema } from "../schemas/AuthSchema";

class AuthServices {
    private async findUserByEmail(email: string) {
        return await prisma.user.findFirst({
            where: { email },
        });
    }

    public async RegisterUser(data: RegisterTypeSchema) {
        const { email, name, lastName, phone, img, role, password } = data;

        const existingUser = await this.findUserByEmail(email);
        if (existingUser) {
            throw new Error("El usuario ya está registrado con este correo.");
        }

        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                lastName,
                phone,
                img,
                role: role || "EMPLOYEE",
                password,
            },
        });

        return newUser;
    }

}

export const AuthService = new AuthServices()
