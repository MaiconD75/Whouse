import { Repository, getRepository } from 'typeorm';

import IStocksRepository from '@modules/stocks/repositories/IStocksRepository';
import ICreateStockDTO from '@modules/stocks/dtos/ICreateStockDTO';
import AppError from '@shared/errors/AppError';

import Product from '@modules/products/infra/typeorm/entities/Product';
import INewStockDTO from '@modules/stocks/dtos/INewStockDTO';
import Stock from '../entities/Stock';

class StocksRepository implements IStocksRepository {
  private ormRepository: Repository<Stock>;

  private productRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Stock);
    this.productRepository = getRepository(Product);
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

  public async findStocks(warehouse_id: string): Promise<Array<INewStockDTO>> {
    const stocks = await this.ormRepository.find({
      where: { warehouse_id },
    });

    const newStocks = Promise.all(
      stocks.map(async stock => ({
        ...stock,
        products: await this.productRepository.find({
          where: { stock_id: stock.id },
        }),
      })),
    );

    return newStocks;
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
