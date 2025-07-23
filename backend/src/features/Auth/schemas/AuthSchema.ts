import z from "zod";

export const RegisterSchema = z.object({
    name: z.string(),
    lastName: z.string(),
    phone: z.number().min(60000000),
    img: z.string().url(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['ADMIN', 'EMPLOYEE']).optional()
})

export type RegisterTypeSchema = z.infer<typeof RegisterSchema>;


export const validateRegister = (input: unknown): RegisterTypeSchema => {
    const result = RegisterSchema.safeParse(input);
    if (!result.success) {
        throw result.error;
    }
    return result.data;
};