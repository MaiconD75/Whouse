import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateStockService from '@modules/stocks/services/CreateStockService';
import DeleteStockService from '@modules/stocks/services/DeleteStockService';
import UpdateStockService from '@modules/stocks/services/UpdateStockService';
import GetStockService from '@modules/stocks/services/GetStockService';

export default class StocksController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, warehouse_id } = request.body;
    const createStock = container.resolve(CreateStockService);
    const stock = await createStock.execute({ name, warehouse_id });

    return response.json(stock);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;
    const deleteStock = container.resolve(DeleteStockService);
    await deleteStock.execute({ id });

    return response.json({ deleted: true });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getStock = container.resolve(GetStockService);
    const stock = await getStock.execute({ id });

    return response.json(stock);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name } = request.body;
    const updateStock = container.resolve(UpdateStockService);
    const warehouse = await updateStock.execute({ id, name });

    return response.json(warehouse);
  }
}
