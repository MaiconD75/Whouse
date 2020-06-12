import { Router } from 'express';

import WarehousesController from '../controllers/WarehousesController';

const warehousesRouter = Router();
const warehousesController = new WarehousesController();

warehousesRouter.get('/', warehousesController.show);

warehousesRouter.post('/', warehousesController.create);

warehousesRouter.delete('/', warehousesController.delete);

warehousesRouter.put('/', warehousesController.update);

export default warehousesRouter;
