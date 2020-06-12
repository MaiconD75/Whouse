import { container } from 'tsyringe';

import IWarehousesRepository from '@modules/warehouses/repositories/IWarehousesRepository';
import WarehousesRepository from '@modules/warehouses/infra/typeorm/repositories/WarehousesRepository';

import IStocksRepository from '@modules/stocks/repositories/IStocksRepository';
import StocksRepository from '@modules/stocks/infra/typeorm/repositories/StocksRepository';

container.registerSingleton<IWarehousesRepository>(
  'WarehousesRepository',
  WarehousesRepository,
);

container.registerSingleton<IStocksRepository>(
  'StocksRepository',
  StocksRepository,
);
