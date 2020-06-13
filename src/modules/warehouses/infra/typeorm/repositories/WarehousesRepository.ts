import { Repository, getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import IWarehousesRepository from '@modules/warehouses/repositories/IWarehousesRepository';
import ICreateWarehouseDTO from '@modules/warehouses/dtos/ICreateWarehouseDTO';
import INewWarehouseDTO from '@modules/warehouses/dtos/INewWarehouseDTO';

import Stock from '@modules/stocks/infra/typeorm/entities/Stock';
import Warehouse from '../entities/Warehouse';

class WarehousesRepository implements IWarehousesRepository {
  private ormRepository: Repository<Warehouse>;

  private stocksRepository: Repository<Stock>;

  constructor() {
    this.ormRepository = getRepository(Warehouse);
    this.stocksRepository = getRepository(Stock);
  }

  public async findAllWarehouses(): Promise<
    Array<INewWarehouseDTO> | undefined
  > {
    const warehouses = await this.ormRepository.find();

    const newWarehouses = await Promise.all(
      warehouses.map(async warehouse => {
        const warehouse_id = warehouse.id;
        const stocks = await this.stocksRepository.find({
          where: { warehouse_id },
        });
        const newList = {
          ...warehouse,
          stocks,
        };
        return newList;
      }),
    );
    return newWarehouses;
  }

  public async findWarehouse(
    id: string,
  ): Promise<INewWarehouseDTO | undefined> {
    const warehouse = await this.ormRepository.findOne(id);
    if (!warehouse) {
      throw new AppError('This warehouse does not exist');
    }
    const stocks = await this.stocksRepository.find({
      where: { warehouse_id: id },
    });
    const newWarehouse = {
      ...warehouse,
      stocks,
    };

    return newWarehouse;
  }

  public async findByName(name: string): Promise<Warehouse | undefined> {
    const findWarehouse = await this.ormRepository.findOne({
      where: { name },
    });
    return findWarehouse;
  }

  public async findById(id: string): Promise<Warehouse | undefined> {
    try {
      const findWarehouse = await this.ormRepository.findOne(id);
      return findWarehouse;
    } catch {
      throw new AppError('This is a invalid id');
    }
  }

  public async create({
    name,
    description,
  }: ICreateWarehouseDTO): Promise<Warehouse> {
    const warehouse = this.ormRepository.create({ name, description });

    return this.save(warehouse);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ id });
  }

  public async save(warehouse: Warehouse): Promise<Warehouse> {
    await this.ormRepository.save(warehouse);

    return warehouse;
  }
}

export default WarehousesRepository;
