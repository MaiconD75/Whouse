import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import uploadConfig from '@config/upload';
import Product from '@modules/products/infra/typeorm/entities/Product';

interface IRequest {
  id: string;
  filename: string;
}

@injectable()
class UploadProductImageService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    id,
    filename,
  }: IRequest): Promise<Product | undefined> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError(
        `A non-existent product can't add or modify your image`,
      );
    }

    if (product.product_image) {
      const productImageFilePath = path.join(
        uploadConfig.directory,
        product.product_image,
      );
      const productImageExists = await fs.promises.stat(productImageFilePath);

      if (productImageExists) {
        await fs.promises.unlink(productImageFilePath);
      }
    }

    product.product_image = filename;

    await this.productsRepository.save(product);

    return product;
  }
}

export default UploadProductImageService;
