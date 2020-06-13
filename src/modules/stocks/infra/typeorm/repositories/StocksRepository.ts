import { Repository, getRepository } from 'typeorm';

import IStocksRepository from '@modules/stocks/repositories/IStocksRepository';
import ICreateStockDTO from '@modules/stocks/dtos/ICreateStockDTO';
import Stock from '../entities/Stock';

class StocksRepository implements IStocksRepository {
  private ormRepository: Repository<Stock>;

  constructor() {
    this.ormRepository = getRepository(Stock);
  }

  public async findSameStock({
    name,
    warehouse_id,
  }: ICreateStockDTO): Promise<Stock | undefined> {
    const stock = this.ormRepository.findOne({ where: { name, warehouse_id } });

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
