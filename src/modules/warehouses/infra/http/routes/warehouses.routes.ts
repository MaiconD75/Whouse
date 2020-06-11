import { Router } from 'express';

import WarehousesController from '../controllers/WarehousesController';

const warehousesRouter = Router();
const warehousesController = new WarehousesController();

// warehousesRouter.get('/', async (request, response) => {
//   const warehouses = await warehousesRepository.find();

//   return response.json(warehouses);
// });

warehousesRouter.post('/', warehousesController.create);

warehousesRouter.delete('/', warehousesController.delete);

// warehousesRouter.put('/', warehousesController.);

export default warehousesRouter;
