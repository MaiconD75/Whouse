import { injectable, inject } from 'tsyringe';

import IWarehousesRepository from '../repositories/IWarehousesRepository';
import INewWarehouseDTO from '../dtos/INewWarehouseDTO';

interface IRequest {
  id: string;
}

@injectable()
class GetWarehouseService {
  constructor(
    @inject('WarehousesRepository')
    private warehousesRepository: IWarehousesRepository,
  ) {}

  public async execute({
    id,
  }: IRequest): Promise<INewWarehouseDTO | undefined> {
    const warehouse = await this.warehousesRepository.findWarehouse(id);

    return warehouse;
  }
}

export default GetWarehouseService;
