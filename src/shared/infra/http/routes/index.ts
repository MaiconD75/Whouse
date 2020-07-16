import { Router } from 'express';

import warehousesRouter from '@modules/warehouses/infra/http/routes/warehouses.routes';
import stocksRouter from '@modules/stocks/infra/http/routes/stocks.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';

const routes = Router();

routes.use('/warehouses', warehousesRouter);
routes.use('/stocks', stocksRouter);
routes.use('/products', productsRouter);

export default routes;
