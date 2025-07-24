import z from "zod";

export const RegisterSchema = z.object({
    name: z.string(),
    lastName: z.string(),
    phone: z.number().min(60000000),
    img: z.string().url(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['ADMIN', 'EMPLOYEE']).optional(),
})

export type RegisterTypeSchema = z.infer<typeof RegisterSchema>;

const LoginSchema = z.object({
    username: z
        .string()
        .min(3, "El nombre de usuario debe tener al menos 3 caracteres").optional(),
    email: z.string().email("Email no válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginType = z.infer<typeof LoginSchema>;


export const validateRegister = (input: unknown): RegisterTypeSchema => {
    const result = RegisterSchema.safeParse(input);
    if (!result.success) {
        throw result.error;
    }
    return result.data;
};

export const validateLogin = (input: unknown): LoginType => {
    return LoginSchema.parse(input);
};