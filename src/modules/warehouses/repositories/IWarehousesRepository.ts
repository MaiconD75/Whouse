import Warehouse from '../infra/typeorm/entities/Warehouse';
import ICreateWarehouseDTO from '../dtos/ICreateWarehouseDTO';
import INewWarehouseDTO from '../dtos/INewWarehouseDTO';

export default interface IWarehousesRepository {
  findByName(name: string): Promise<Warehouse | undefined>;
  findById(id: string): Promise<Warehouse | undefined>;
  findAllWarehouses(): Promise<Array<Warehouse> | undefined>;
  findWarehouse(id: string): Promise<INewWarehouseDTO | undefined>;

  delete(id: string): Promise<void>;
  save(warehouse: Warehouse): Promise<Warehouse>;
  create(data: ICreateWarehouseDTO): Promise<Warehouse>;
}
