import { Router } from 'express';

import warehousesRouter from '@modules/warehouses/infra/http/routes/warehouses.routes';
import stocksRouter from '@modules/stocks/infra/http/routes/stocks.routes';

const routes = Router();

routes.use('/warehouses', warehousesRouter);
routes.use('/stocks', stocksRouter);

export default routes;
