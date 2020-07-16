import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const productExist = await this.productsRepository.findById(id);

    if (!productExist) {
      throw new AppError('This product does not exist');
    }

    await this.productsRepository.delete(id);
  }
}

export default DeleteProductService;
