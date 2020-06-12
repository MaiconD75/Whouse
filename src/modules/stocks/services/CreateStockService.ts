import { injectable, inject } from 'tsyringe';

import IStocksRepository from '@modules/stocks/repositories/IStocksRepository';
import AppError from '@shared/errors/AppError';
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
  ) {}

  public async execute({ name, warehouse_id }: IRequest): Promise<Stock> {
    const findSameStockName = await this.stocksRepository.findByName(name);

    if (findSameStockName) {
      throw new AppError('This name is already booked');
    }

    const stock = await this.stocksRepository.create({ name, warehouse_id });

    return stock;
  }
}

export default CreateStockService;
