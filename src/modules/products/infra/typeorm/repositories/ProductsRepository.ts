import { Repository, getRepository } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import AppError from '@shared/errors/AppError';
import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findById(id: string): Promise<Product | undefined> {
    try {
      const product = await this.ormRepository.findOne(id);
      return product;
    } catch {
      throw new AppError('This is a invalid id');
    }
  }

  public async findSameProduct(
    name: string,
    stock_id: string,
  ): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { name, stock_id },
    });

    return product;
  }

  public async create({
    name,
    specification,
    amount,
    stock_id,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      specification,
      amount,
      stock_id,
    });

    return this.save(product);
  }

  public async delete(id: string): Promise<void> {
    this.ormRepository.delete({ id });
  }

  public async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);

    return product;
  }
}

export default ProductsRepository;
