import z from "zod";

export const updateClientSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  state: z.enum(["POTENCIAL", "ACTIVO", "PERDIDO", "FRIO"]).optional(),
  assignedToId: z.string().nullable().optional()
});

export type UpdateClientDto = z.infer<typeof updateClientSchema>;

export const validateUpdates = (input: unknown): UpdateClientDto => {
  const result = updateClientSchema.safeParse(input);
  if (!result.success) {
    throw result.error;
  }
  return result.data;
};
