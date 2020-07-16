import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, specification, amount, stock_id } = request.body;
    const createProduct = container.resolve(CreateProductService);
    const product = await createProduct.execute({
      name,
      specification,
      amount,
      stock_id,
    });

    return response.json(product);
  }
}
