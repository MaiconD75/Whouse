import { injectable, inject } from 'tsyringe';

import IWarehousesRepository from '@modules/warehouses/repositories/IWarehousesRepository';
import AppError from '@shared/errors/AppError';

interface Request {
  id: string;
}

@injectable()
class DeleteWarehouseService {
  constructor(
    @inject('WarehousesRepository')
    private warehousesRepository: IWarehousesRepository,
  ) {}

  public async execute({ id }: Request): Promise<void> {
    const warehouseExist = await this.warehousesRepository.findById(id);
    if (!warehouseExist) {
      throw new AppError('Warehouse does not exist');
    }
    await this.warehousesRepository.delete(id);
  }
}

export default DeleteWarehouseService;
