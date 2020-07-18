import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UploadProductImageService from '@modules/products/services/UploadProductsImage';

export default class ProductsImageController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { filename } = request.file;
    const { id } = request.params;
    const uploadImageProduct = container.resolve(UploadProductImageService);

    const product = await uploadImageProduct.execute({ id, filename });

    return response.json(product);
  }
}
