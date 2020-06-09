import { Router } from 'express';

// import warehousesRouter from './warehouses.routes';

const routes = Router();

// routes.use('/warehouses', warehousesRouter);

routes.get('/', (request, response) =>
  response.json({
    message: "Hello World! I am Whouse's API. Nice to meet you!!",
  }),
);

export default routes;
