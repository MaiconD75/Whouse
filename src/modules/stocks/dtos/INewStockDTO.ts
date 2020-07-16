import Product from '@modules/products/infra/typeorm/entities/Product';

export default interface INewStockDTO {
  products: Product[];
  id: string;
  name: string;
  warehouse_id: string;
  created_at: Date;
  updated_at: Date;
}
