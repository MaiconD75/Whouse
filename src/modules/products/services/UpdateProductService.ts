import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  id: string;
  name: string;
  specification: string;
  amount: number;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    id,
    name,
    specification,
    amount,
  }: IRequest): Promise<Product | undefined> {
    if (amount < 0) {
      throw new AppError('Products does not can have a negative amount');
    }

    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError(`A non-existent product can't by modified`);
    }

    const { stock_id } = product;

    const repeatedName = await this.productsRepository.findSameProduct(
      name,
      stock_id,
    );

    if (repeatedName) {
      throw new AppError(
        'This name is already booked or the product already has this name',
      );
    }

    product.name = name;
    product.specification = specification;
    product.amount = amount;

    await this.productsRepository.save(product);
    const editedProduct = await this.productsRepository.findById(id);

    return editedProduct;
  }
}

export default UpdateProductService;
