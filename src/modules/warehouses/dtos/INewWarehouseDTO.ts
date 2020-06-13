import Stock from '@modules/stocks/infra/typeorm/entities/Stock';

export default interface INewWarehouseDTO {
  stocks: Stock[] | undefined;
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}
