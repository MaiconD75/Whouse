import { injectable, inject } from 'tsyringe';

import IWarehousesRepository from '@modules/warehouses/repositories/IWarehousesRepository';
import AppError from '@shared/errors/AppError';
import Warehouse from '../infra/typeorm/entities/Warehouse';

interface IRequest {
  id: string;
  name: string;
  description: string;
}

@injectable()
class UpdateWarehouseService {
  constructor(
    @inject('WarehousesRepository')
    private warehousesRepository: IWarehousesRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
  }: IRequest): Promise<Warehouse | undefined> {
    const warehouse = await this.warehousesRepository.findById(id);

    if (!warehouse) {
      throw new AppError(`A non-existent warehouse can't by modified`);
    }

    warehouse.name = name;
    warehouse.description = description;

    await this.warehousesRepository.save(warehouse);
    const editedWarehouse = await this.warehousesRepository.findById(id);

    return editedWarehouse;
  }
}

export default UpdateWarehouseService;
