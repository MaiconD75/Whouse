import { getCustomRepository } from 'typeorm';

import Warehouse from '../models/Warehouse';
import WarehousesRepository from '../repositories/WarehousesRepository';

interface Request {
  name: string;
  description: string;
}

class CreateWarehouseService {
  public async execute({ name, description }: Request): Promise<Warehouse> {
    const warehousesRepository = getCustomRepository(WarehousesRepository);

    const findSameWarehouseName = warehousesRepository.findByName(name);

    if (findSameWarehouseName) {
      throw Error('This name is alredy booked');
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
