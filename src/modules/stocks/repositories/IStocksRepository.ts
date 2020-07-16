import Stock from '../infra/typeorm/entities/Stock';
import ICreateStockDTO from '../dtos/ICreateStockDTO';
import INewStockDTO from '../dtos/INewStockDTO';

export default interface IStocksRepository {
  findById(id: string): Promise<Stock | undefined>;
  findSameStock(data: ICreateStockDTO): Promise<Stock | undefined>;
  findStocks(warehouse_id: string): Promise<Array<INewStockDTO>>;

  create(data: ICreateStockDTO): Promise<Stock>;
  delete(id: string): Promise<void>;
  save(stock: Stock): Promise<Stock>;
}
