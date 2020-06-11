import { Router } from 'express';

import warehousesRouter from './warehouses.routes';

const routes = Router();

routes.use('/warehouses', warehousesRouter);

export default routes;
