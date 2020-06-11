import { EntityRepository, Repository } from 'typeorm';

import Warehouse from '../models/Warehouse';
import AppError from '../errors/AppError';

@EntityRepository(Warehouse)
class WarehousesRepository extends Repository<Warehouse> {
  public async findByName(name: string): Promise<Warehouse | null> {
    const findWarehouse = await this.findOne({
      where: { name },
    });
    return findWarehouse || null;
  }

  public async findById(id: string): Promise<Warehouse | null> {
    try {
      const findWarehouse = await this.findOne({
        where: { id },
      });
      return findWarehouse || null;
    } catch {
      throw new AppError('This is a invalid id');
    }
  }
}

export default WarehousesRepository;
