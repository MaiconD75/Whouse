import { injectable, inject } from 'tsyringe';

import IStocksRepository from '@modules/stocks/repositories/IStocksRepository';
import AppError from '@shared/errors/AppError';
import IWarehousesRepository from '../repositories/IWarehousesRepository';
import INewWarehouseDTO from '../dtos/INewWarehouseDTO';

interface IRequest {
  id: string;
}

@injectable()
class GetWarehouseService {
  constructor(
    @inject('StocksRepository')
    private stocksRepository: IStocksRepository,
    @inject('WarehousesRepository')
    private warehousesRepository: IWarehousesRepository,
  ) {}

  public async execute({
    id,
  }: IRequest): Promise<INewWarehouseDTO | undefined> {
    const warehouse = await this.warehousesRepository.findById(id);

    if (!warehouse) {
      throw new AppError('This warehouse does not exist');
    }

    const stocks = await this.stocksRepository.findStocks(id);

    const newWarehouse = {
      ...warehouse,
      stocks,
    };

    return newWarehouse;
  }
}

export default GetWarehouseService;
