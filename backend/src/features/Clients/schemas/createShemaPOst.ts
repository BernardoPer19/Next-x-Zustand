import z from "zod";

export const createClientSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Email inválido").optional(),
  phone: z.string().min(1, "El teléfono es obligatorio"),
  state: z.enum(["POTENCIAL", "ACTIVO", "PERDIDO", "FRIO"]).optional(),
  assignedToId: z.string().nullable().optional(),
});

export type CreateClientDto = z.infer<typeof createClientSchema>;

export const validateCreateClient = (input: unknown): CreateClientDto => {
  const result = createClientSchema.safeParse(input);
  if (!result.success) {
    throw result.error;
  }
  return result.data;
};
