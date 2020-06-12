import { Repository, getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import IWarehousesRepository from '@modules/warehouses/repositories/IWarehousesRepository';
import ICreateWarehouseDTO from '@modules/warehouses/dtos/ICreateWarehouseDTO';
import IDeleteWarehouseDTO from '@modules/warehouses/dtos/IDeleteWarehouseDTO';

import Warehouse from '../entities/Warehouse';

class WarehousesRepository implements IWarehousesRepository {
  private ormRepository: Repository<Warehouse>;

  constructor() {
    this.ormRepository = getRepository(Warehouse);
  }

  public async findAllWarehouses(): Promise<Array<Warehouse> | undefined> {
    const warehouses = await this.ormRepository.find();

    return warehouses;
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

    await this.ormRepository.save(warehouse);

    return warehouse;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default WarehousesRepository;
