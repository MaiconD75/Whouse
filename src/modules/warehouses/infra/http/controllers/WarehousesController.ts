import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateWarehouseService from '@modules/warehouses/services/CreateWarehouseService';
import DeleteWarehouseService from '@modules/warehouses/services/DeleteWarehouseService';
import ListWarehousesService from '@modules/warehouses/services/ListWarehousesService';
import UpdateWarehouseService from '@modules/warehouses/services/UpdateWarehouseService';
import GetWarehouseService from '@modules/warehouses/services/GetWarehouseService';

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

  public async show(request: Request, response: Response): Promise<Response> {
    const listWarehouses = container.resolve(ListWarehousesService);
    const warehouses = await listWarehouses.execute();

    return response.json(warehouses);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getWarehouse = container.resolve(GetWarehouseService);
    const warehouse = await getWarehouse.execute({ id });

    return response.json(warehouse);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name, description } = request.body;
    const updateWarehouse = container.resolve(UpdateWarehouseService);

    const warehouse = await updateWarehouse.execute({ id, name, description });

    return response.json(warehouse);
  }
}
