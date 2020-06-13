import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStocksRepository from '../repositories/IStocksRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteStockService {
  constructor(
    @inject('StocksRepository')
    private stocksRepository: IStocksRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const warehouseExist = this.stocksRepository.findById(id);

    if (!warehouseExist) {
      throw new AppError('This stock does not exist');
    }

    await this.stocksRepository.delete(id);
  }
}

export default DeleteStockService;
