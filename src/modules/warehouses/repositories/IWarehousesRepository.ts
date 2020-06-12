import Warehouse from '../infra/typeorm/entities/Warehouse';
import ICreateWarehouseDTO from '../dtos/ICreateWarehouseDTO';

export default interface IWarehousesRepository {
  delete(id: string): Promise<void>;
  save(warehouse: Warehouse): Promise<Warehouse>;
  create(data: ICreateWarehouseDTO): Promise<Warehouse>;
  findByName(name: string): Promise<Warehouse | undefined>;
  findById(id: string): Promise<Warehouse | undefined>;
  findAllWarehouses(): Promise<Array<Warehouse> | undefined>;
}
