import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateWarehouseService from '@modules/warehouses/services/CreateWarehouseService';
import DeleteWarehouseService from '@modules/warehouses/services/DeleteWarehouseService';
import ListWarehouseService from '@modules/warehouses/services/ListWarehouseService';

export default class WarehousesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const createWarehouse = container.resolve(CreateWarehouseService);

    const warehouse = await createWarehouse.execute({ name, description });

    return response.json(warehouse);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;
    const deleteWarehouse = container.resolve(DeleteWarehouseService);

    await deleteWarehouse.execute({ id });

    return response.json({ deleted: true });
  }

  public async show(_: Request, response: Response): Promise<Response> {
    const createWarehouse = container.resolve(ListWarehouseService);
    const warehouses = await createWarehouse.execute();

    return response.json(warehouses);
  }
}
