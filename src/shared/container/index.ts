import { container } from 'tsyringe';

import IWarehousesRepository from '@modules/warehouses/repositories/IWarehousesRepository';
import WarehousesRepository from '@modules/warehouses/infra/typeorm/repositories/WarehousesRepository';

import IStocksRepository from '@modules/stocks/repositories/IStocksRepository';
import StocksRepository from '@modules/stocks/infra/typeorm/repositories/StocksRepository';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

container.registerSingleton<IWarehousesRepository>(
  'WarehousesRepository',
  WarehousesRepository,
);

container.registerSingleton<IStocksRepository>(
  'StocksRepository',
  StocksRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);
