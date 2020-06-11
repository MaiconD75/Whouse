import { getCustomRepository } from 'typeorm';

import WarehousesRepository from '../repositories/WarehousesRepository';
import AppError from '../errors/AppError';
import Warehouse from '../models/Warehouse';

interface Request {
  id: string;
}

class RemoveWarehouseService {
  public async execute({ id }: Request): Promise<void> {
    const warehousesRepository = getCustomRepository(WarehousesRepository);

    const warehouseExist = await warehousesRepository.findById(id);
    if (!warehouseExist) {
      throw new AppError('Warehouse does not exist');
    }
    warehousesRepository.delete({ id });
  }
}

export default RemoveWarehouseService;
