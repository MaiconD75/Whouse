import { Router } from 'express';

import warehousesRouter from '@modules/warehouses/infra/http/routes/warehouses.routes';

const routes = Router();

routes.use('/warehouses', warehousesRouter);

export default routes;
