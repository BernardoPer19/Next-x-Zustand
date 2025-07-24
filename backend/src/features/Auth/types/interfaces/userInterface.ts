import { EstadoCliente, Role } from "@prisma/client";

export interface RegisterUser {
    id: string
    userName: string;
    name: string;
    lastName: string;
    email: string;
    phone: number;
    img: string;
    role: Role;
    password: string;
    createdAt: Date;
}


export interface RegisterClient {
    name: string;
    lastName: string;
    email: string;
    state: EstadoCliente;
    phone: string;
    createdAt: Date;
}
