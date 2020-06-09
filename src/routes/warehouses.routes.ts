import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import WarehousesRepository from '../repositories/WarehousesRepository';
import CreateWarehouseService from '../services/CreateWarehouseService';

const warehousesRouter = Router();

warehousesRouter.get('/', (request, response) => {
  const warehousesRepository = getCustomRepository(WarehousesRepository);
  const warehouses = warehousesRepository.find();

  return response.json(warehouses);
});

warehousesRouter.post('/', async (request, response) => {
  try {
    const { name, description } = request.body;

    const createWarehouse = new CreateWarehouseService();

    const warehouse = await createWarehouse.execute({ name, description });

    return response.json(warehouse);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default warehousesRouter;
