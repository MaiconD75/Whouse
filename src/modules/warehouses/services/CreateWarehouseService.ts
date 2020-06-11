import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IWarehousesRepository from '../repositories/IWarehousesRepository';
import Warehouse from '../infra/typeorm/entities/Warehouse';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateWarehouseService {
  constructor(
    @inject('WarehousesRepository')
    private warehousesRepository: IWarehousesRepository,
  ) {}

  public async execute({ name, description }: IRequest): Promise<Warehouse> {
    const findSameWarehouseName = await this.warehousesRepository.findByName(
      name,
    );

    if (findSameWarehouseName) {
      throw new AppError('This name is alredy booked');
    }

    const warehouse = await this.warehousesRepository.create({
      name,
      description,
    });

    return warehouse;
  }
}

export default CreateWarehouseService;
