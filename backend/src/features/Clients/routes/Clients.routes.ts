// src/modules/client/routes/client.routes.ts
import { Router } from "express";
import type { PrismaClient } from "@prisma/client";
import { ClientService } from "../services/ClientService";
import { ClientController } from "../controllers/ClientControllers";

export function iniciarClientRouter({ prisma }: { prisma: PrismaClient }) {
    const clientService = new ClientService(prisma);
    const clientController = new ClientController(clientService);

    const router = Router();

    router.get("/", clientController.getAllClients.bind(clientController));
    router.get("/:id", clientController.getClientById.bind(clientController));
    router.post("/", clientController.createClient.bind(clientController));
    router.put("/:id", clientController.updateClient.bind(clientController));
    router.delete("/:id", clientController.deleteClient.bind(clientController));

    return router;
}
