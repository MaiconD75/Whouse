import Product from '../infra/typeorm/entities/Product';
import ICreateProductDTO from '../dtos/ICreateProductDTO';

export default interface IProductsRepository {
  findById(id: string): Promise<Product | undefined>;
  findSameProduct(name: string, stock_id: string): Promise<Product | undefined>;

  create(data: ICreateProductDTO): Promise<Product>;
  delete(id: string): Promise<void>;
  save(Product: Product): Promise<Product>;
}
