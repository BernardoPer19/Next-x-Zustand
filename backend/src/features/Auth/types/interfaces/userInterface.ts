import { EstadoCliente, Role } from "@prisma/client";

export interface RegisterUser {
    userName: string;
    name: string;
    lastName: string;
    email: string;
    phone: number;
    img: string;
    role: Role;
    password: string;
    createAt: Date;
}


export interface RegisterClient {
    name: string;
    lastName: string;
    email: string;
    state: EstadoCliente;
    phone: string;
    createAt: Date;
}
