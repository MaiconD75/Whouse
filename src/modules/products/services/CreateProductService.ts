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
    const stockExist = await this.stocksRepository.findById(stock_id);
    const productExist = await this.productsRepository.findSameProduct(
      name,
      stock_id,
    );
    console.log(stock_id);
    console.log(stockExist);

    if (amount < 0) {
      throw new AppError('Products not can have a negative amount');
    }

    if (!stockExist) {
      throw new AppError('This stock does not exist');
    }
    console.log(productExist);
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
