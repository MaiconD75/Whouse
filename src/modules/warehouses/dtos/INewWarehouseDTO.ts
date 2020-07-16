import INewStockDTO from '../../stocks/dtos/INewStockDTO';

export default interface INewWarehouseDTO {
  stocks: Array<INewStockDTO>;
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}
