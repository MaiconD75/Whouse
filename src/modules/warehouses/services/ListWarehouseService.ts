import { injectable, inject } from 'tsyringe';

import IWarehousesRepository from '../repositories/IWarehousesRepository';
import Warehouse from '../infra/typeorm/entities/Warehouse';

@injectable()
class CreateWarehouseService {
  constructor(
    @inject('WarehousesRepository')
    private warehousesRepository: IWarehousesRepository,
  ) {}

  public async execute(): Promise<Array<Warehouse> | undefined> {
    const warehouses = await this.warehousesRepository.findAllWarehouses();

    return warehouses;
  }
}

export default CreateWarehouseService;
