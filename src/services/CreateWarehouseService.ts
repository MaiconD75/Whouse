import { getCustomRepository } from 'typeorm';

import Warehouse from '../models/Warehouse';
import WarehousesRepository from '../repositories/WarehousesRepository';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  description: string;
}

class CreateWarehouseService {
  public async execute({ name, description }: Request): Promise<Warehouse> {
    const warehousesRepository = getCustomRepository(WarehousesRepository);

    const findSameWarehouseName = await warehousesRepository.findByName(name);

    if (findSameWarehouseName) {
      throw new AppError('This name is alredy booked');
    }

    const warehouse = warehousesRepository.create({
      name,
      description,
    });

    await warehousesRepository.save(warehouse);

    return warehouse;
  }
}

export default CreateWarehouseService;
