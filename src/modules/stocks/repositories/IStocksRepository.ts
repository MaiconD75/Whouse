import Stock from '../infra/typeorm/entities/Stock';
import ICreateStockDTO from '../dtos/ICreateStockDTO';

export default interface IStocksRepository {
  findSameStock(data: ICreateStockDTO): Promise<Stock | undefined>;

  create(data: ICreateStockDTO): Promise<Stock>;
  save(stock: Stock): Promise<Stock>;
}
