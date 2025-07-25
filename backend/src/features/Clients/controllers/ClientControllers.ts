import { Request, Response } from "express";
import { ClientService } from "../services/ClientService";
import { validateUpdates } from "../schemas/Schema";
import { CustomError } from "../../../Error/CustomError";
import { validateCreateClient } from "../schemas/createShemaPOst";
import { catchAsync } from "../../../middlewares";

export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  public getAllClients = catchAsync(async (req: Request, res: Response) => {
    const clients = await this.clientService.getUsersService();
    res.json(clients);
  });

  public getClientById = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      throw new CustomError("ID del cliente no proporcionado", 400);
    }

    const client = await this.clientService.getUserByIdService(id);
    if (!client) {
      throw new CustomError("Cliente no encontrado", 404);
    }

    res.json(client);
  });

  public createClient = catchAsync(async (req: Request, res: Response) => {
    const validatedData = validateCreateClient(req.body);
    const clientData = {
      ...validatedData,
      assignedToId: validatedData.assignedToId === null ? undefined : validatedData.assignedToId
    };

    const newClient = await this.clientService.createClient(clientData);
    res.status(201).json(newClient);
  });

  public deleteClient = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      throw new CustomError("ID del cliente no proporcionado", 400);
    }

    await this.clientService.deleteClient(id);
    res.status(204).send();
  });

  public updateClient = catchAsync(async (req: Request, res: Response) => {
    const validatedData = validateUpdates(req.body);

    const id = req.params.id;
    if (!id) {
      throw new CustomError("ID del cliente no proporcionado", 400);
    }

    const client = await this.clientService.updateDataClient(id, validatedData);
    res.json(client);
  });
}
