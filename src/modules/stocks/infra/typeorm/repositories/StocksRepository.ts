import { Repository, getRepository } from 'typeorm';

import IStocksRepository from '@modules/stocks/repositories/IStocksRepository';
import ICreateStockDTO from '@modules/stocks/dtos/ICreateStockDTO';
import AppError from '@shared/errors/AppError';
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
    const stock = await this.ormRepository.findOne({
      where: { name, warehouse_id },
    });

    return stock;
  }

  public async findById(id: string): Promise<Stock | undefined> {
    try {
      const stock = await this.ormRepository.findOne(id);
      return stock;
    } catch {
      throw new AppError('This is a invalid id');
    }
  }

  public async create({ name, warehouse_id }: ICreateStockDTO): Promise<Stock> {
    const stock = await this.ormRepository.create({
      name,
      warehouse_id,
    });

    return this.save(stock);
  }

  public async delete(id: string): Promise<void> {
    this.ormRepository.delete({ id });
  }

  public async save(stock: Stock): Promise<Stock> {
    await this.ormRepository.save(stock);

    return stock;
  }
}

export default StocksRepository;
