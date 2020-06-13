import { injectable, inject } from 'tsyringe';

import IWarehousesRepository from '../repositories/IWarehousesRepository';
import INewWarehouseDTO from '../dtos/INewWarehouseDTO';

@injectable()
class ListWarehouseService {
  constructor(
    @inject('WarehousesRepository')
    private warehousesRepository: IWarehousesRepository,
  ) {}

  public async execute(): Promise<Array<INewWarehouseDTO> | undefined> {
    const warehouses = await this.warehousesRepository.findAllWarehouses();

    return warehouses;
  }
}

export default ListWarehouseService;
