import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';

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

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;
    const deleteProduct = container.resolve(DeleteProductService);
    await deleteProduct.execute({ id });

    return response.json({ delete: 'true' });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name, specification, amount } = request.body;
    const updateProduct = container.resolve(UpdateProductService);
    const product = await updateProduct.execute({
      id,
      name,
      specification,
      amount,
    });

    return response.json(product);
  }
}
