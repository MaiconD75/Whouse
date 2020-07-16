import { Repository, getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import IWarehousesRepository from '@modules/warehouses/repositories/IWarehousesRepository';
import ICreateWarehouseDTO from '@modules/warehouses/dtos/ICreateWarehouseDTO';

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
      const warehouse = await this.ormRepository.findOne(id);
      return warehouse;
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
