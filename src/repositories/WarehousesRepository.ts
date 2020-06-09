import { EntityRepository, Repository } from 'typeorm';

import Warehouse from '../models/Warehouse';

@EntityRepository(Warehouse)
class WarehousesRepository extends Repository<Warehouse> {
  public async findByName(name: string): Promise<Warehouse | null> {
    const findWarehouse = await this.findOne({
      where: { name },
    });

    return findWarehouse || null;
  }
}

export default WarehousesRepository;
