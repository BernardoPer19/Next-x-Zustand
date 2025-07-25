import { EstadoCliente } from "@prisma/client";

export interface UpdateClientDto {
  name?: string;
  email?: string;
  phone?: string;
  state?:EstadoCliente
  assignedToId?: string | null;
}

