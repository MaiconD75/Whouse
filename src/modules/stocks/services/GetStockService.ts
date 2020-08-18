import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import IStocksRepository from '../repositories/IStocksRepository';
import INewStockDTO from '../dtos/INewStockDTO';

interface IRequest {
  id: string;
}

@injectable()
class GetStockService {
  constructor(
    @inject('StocksRepository')
    private stockRepository: IStocksRepository,
    @inject('ProductsRepository')
    private productRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<INewStockDTO | undefined> {
    const stock = await this.stockRepository.findById(id);

    if (!stock) {
      throw new AppError('This stock does not exist');
    }

    const products = await this.productRepository.findProducts(id);

    const newStock = {
      ...stock,
      products,
    };

    return newStock;
  }
}

export default GetStockService;
