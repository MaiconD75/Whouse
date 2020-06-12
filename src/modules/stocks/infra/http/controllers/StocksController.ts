import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateStockService from '@modules/stocks/services/CreateStockService';

export default class StocksController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, warehouse_id } = request.body;
    const createStocks = container.resolve(CreateStockService);
    const stock = await createStocks.execute({ name, warehouse_id });

    return response.json(stock);
  }
}
