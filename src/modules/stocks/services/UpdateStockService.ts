import { injectable, inject } from 'tsyringe';

import IStocksRepository from '@modules/stocks/repositories/IStocksRepository';
import AppError from '@shared/errors/AppError';
import Stock from '../infra/typeorm/entities/Stock';

interface IRequest {
  id: string;
  name: string;
}

@injectable()
class UpdatestockService {
  constructor(
    @inject('StocksRepository')
    private stocksRepository: IStocksRepository,
  ) {}

  public async execute({ id, name }: IRequest): Promise<Stock | undefined> {
    const stock = await this.stocksRepository.findById(id);

    if (!stock) {
      throw new AppError(`A non-existent stock can't by modified`);
    }

    const { warehouse_id } = stock;

    const sameName = await this.stocksRepository.findSameStock({
      name,
      warehouse_id,
    });

    if (sameName) {
      const repeatedName = stock.id !== sameName.id;
      console.log(repeatedName, stock.id, sameName.id);
      if (repeatedName) {
        throw new AppError('This name is already booked');
      }
    }

    stock.name = name;

    await this.stocksRepository.save(stock);
    const editedStock = await this.stocksRepository.findById(id);

    return editedStock;
  }
}

export default UpdatestockService;
