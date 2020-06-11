import { container } from 'tsyringe';

import IWarehousesRepository from '@modules/warehouses/repositories/IWarehousesRepository';
import WarehousesRepository from '@modules/warehouses/infra/typeorm/repositories/WarehousesRepository';

container.registerSingleton<IWarehousesRepository>(
  'WarehousesRepository',
  WarehousesRepository,
);
