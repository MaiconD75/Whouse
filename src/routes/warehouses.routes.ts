import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import WarehousesRepository from '../repositories/WarehousesRepository';
import CreateWarehouseService from '../services/CreateWarehouseService';
import RemoveWarehouseService from '../services/DeleteWarehouseService';

const warehousesRouter = Router();

warehousesRouter.get('/', async (request, response) => {
  const warehousesRepository = getCustomRepository(WarehousesRepository);
  const warehouses = await warehousesRepository.find();

  return response.json(warehouses);
});

warehousesRouter.post('/', async (request, response) => {
  const { name, description } = request.body;

  const createWarehouse = new CreateWarehouseService();

  const warehouse = await createWarehouse.execute({ name, description });

  return response.json(warehouse);
});

warehousesRouter.delete('/', async (request, response) => {
  const { id } = request.body;

  const removeWarehouse = new RemoveWarehouseService();

  await removeWarehouse.execute({ id });

  return response.json({ deleted: true });
});

export default warehousesRouter;
