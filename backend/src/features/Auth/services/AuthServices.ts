import { prisma } from "../../../config/prisma";
import { LoginType, RegisterTypeSchema } from "../schemas/AuthSchema";
import { comparePassword } from '../utils/AuthUtils';

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


    /**
     * LoginValidateService
     */
    public async LoginValidateService({ email, password }: LoginType) {
        const user = await this.findUserByEmail(email);
        if (!user) {
            throw new Error("El usuario no está registrado con este correo.");
        }
        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            throw new Error("Contraseña incorrecta");
        }
        return {
            id: user.id,
            email: user.email,
            phone: user.phone,
            createdAt: user.createdAt,
            name: user.name,
            role: user.role,
        };
    }



    async getUserProfile(userId: string): Promise<RegisterTypeSchema> {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                img: true,
                phone: true,
                role: true,
                lastName: true,
                createdAt: true
            },
        });

        if (!user) throw new Error("Usuario no encontrado");


        return {
            name: user.name,
            email: user.email,
            password: "",
            img: user.img,
            lastName: user.lastName,
            phone: user.phone,
            role: user.role,
        };
    }

}

export const AuthService = new AuthServices()
