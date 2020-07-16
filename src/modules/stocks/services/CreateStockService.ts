import { injectable, inject } from 'tsyringe';

import IStocksRepository from '@modules/stocks/repositories/IStocksRepository';
import AppError from '@shared/errors/AppError';
import IWarehousesRepository from '@modules/warehouses/repositories/IWarehousesRepository';
import Stock from '../infra/typeorm/entities/Stock';

interface IRequest {
  name: string;
  warehouse_id: string;
}

@injectable()
class CreateStockService {
  constructor(
    @inject('StocksRepository')
    private stocksRepository: IStocksRepository,
    @inject('WarehousesRepository')
    private warehousesRepository: IWarehousesRepository,
  ) {}

  public async execute({ name, warehouse_id }: IRequest): Promise<Stock> {
    const warehouseExist = await this.warehousesRepository.findById(
      warehouse_id,
    );

    if (!warehouseExist) {
      throw new AppError('This warehouse does not exist');
    }
    const findSameStockName = await this.stocksRepository.findSameStock({
      name,
      warehouse_id,
    });

    if (findSameStockName) {
      throw new AppError('This stock is already booked');
    }

    const stock = await this.stocksRepository.create({ name, warehouse_id });

    return stock;
  }
}

export default CreateStockService;
