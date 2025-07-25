import { Client, EstadoCliente, PrismaClient } from "@prisma/client";
import { CustomError } from "../../../Error/CustomError";
import { UpdateClientDto } from "../../../DTOs/update-client.dto";

export class ClientService {
    constructor(private readonly prisma: PrismaClient) { }

    private async findUserId(id: string): Promise<Client> {
        const user = await this.prisma.client.findUnique({ where: { id } });
        if (!user) {
            throw new CustomError("Usuario no encontrado", 404);
        }
        return user;
    }

    public async getUsersService(): Promise<Client[]> {
        try {
            return await this.prisma.client.findMany();
        } catch {
            throw new CustomError("Error al obtener los usuarios", 500);
        }
    }


    public async createClient(data: {
        name: string;
        email?: string;
        phone: string;
        state?: EstadoCliente;
        assignedToId?: string;
    }): Promise<Client> {
        try {
            const newClient = await this.prisma.client.create({
                data: {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    state: data.state ? (data.state as EstadoCliente) : undefined,
                    assignedToId: data.assignedToId,
                },
            });

            return newClient;
        } catch (err: any) {
            if (err.code === "P2002") {
                // Prisma unique constraint violation
                throw new CustomError("El email ya está en uso", 409);
            }

            throw new CustomError("Error al crear el cliente", 500);
        }
    }


    public async getUserByIdService(id: string): Promise<Client> {
        return await this.findUserId(id);
    }

    public async deleteClient(id: string): Promise<void> {
        const user = await this.findUserId(id);
        if (!user) {
            throw new CustomError("El usuario ya no existe", 500)
        }
        await this.prisma.client.delete({ where: { id } });
    }

    public async updateDataClient(id: string, data: UpdateClientDto): Promise<Client> {
        const user = await this.findUserId(id);
        if (!user) {
            throw new CustomError("El usuario ya no existe", 500)
        }

        try {
            return await this.prisma.client.update({
                where: { id },
                data: {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    state: data.state,
                    assignedToId: data.assignedToId,
                    updatedAt: new Date()
                }
            });
        } catch {
            throw new CustomError("Error al actualizar los datos del cliente", 500);
        }
    }
}
