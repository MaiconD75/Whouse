import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStocksRepository from '@modules/stocks/repositories/IStocksRepository';
import IProductsRepository from '../repositories/IProductsRepository';
import Products from '../infra/typeorm/entities/Product';

interface IRequest {
  name: string;
  specification: string;
  amount: number;
  stock_id: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('StocksRepository')
    private stocksRepository: IStocksRepository,
  ) {}

  public async execute({
    name,
    specification,
    amount,
    stock_id,
  }: IRequest): Promise<Products> {
    if (amount < 0) {
      throw new AppError('Products does not can have a negative amount');
    }

    const stockExist = await this.stocksRepository.findById(stock_id);

    if (!stockExist) {
      throw new AppError('This stock does not exist');
    }

    const productExist = await this.productsRepository.findSameProduct(
      name,
      stock_id,
    );

    if (productExist) {
      throw new AppError('This product is already booked in this stock');
    }

    const product = this.productsRepository.create({
      name,
      specification,
      amount,
      stock_id,
    });

    return product;
  }
}

export default CreateProductService;
