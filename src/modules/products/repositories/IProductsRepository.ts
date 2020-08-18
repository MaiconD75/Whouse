import Product from '../infra/typeorm/entities/Product';
import ICreateProductDTO from '../dtos/ICreateProductDTO';

export default interface IProductsRepository {
  findById(id: string): Promise<Product | undefined>;
  findSameProduct(name: string, stock_id: string): Promise<Product | undefined>;
  findProducts(stock_id: string): Promise<Array<Product>>;

  create(data: ICreateProductDTO): Promise<Product>;
  delete(id: string): Promise<void>;
  save(Product: Product): Promise<Product>;
}
