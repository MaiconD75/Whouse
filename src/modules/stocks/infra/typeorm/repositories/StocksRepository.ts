import { Repository, getRepository } from 'typeorm';

import IStocksRepository from '@modules/stocks/repositories/IStocksRepository';
import ICreateStockDTO from '@modules/stocks/dtos/ICreateStockDTO';
import Stock from '../entities/Stock';

class StocksRepository implements IStocksRepository {
  private ormRepository: Repository<Stock>;

  constructor() {
    this.ormRepository = getRepository(Stock);
  }

  public async findByName(name: string): Promise<Stock | undefined> {
    const stock = this.ormRepository.findOne({ where: { name } });

    return stock;
  }

  public async create({ name, warehouse_id }: ICreateStockDTO): Promise<Stock> {
    const stock = this.ormRepository.create({
      name,
      warehouse_id,
    });

    return this.save(stock);
  }

  public async save(stock: Stock): Promise<Stock> {
    await this.ormRepository.save(stock);

    return stock;
  }
}

export default StocksRepository;
