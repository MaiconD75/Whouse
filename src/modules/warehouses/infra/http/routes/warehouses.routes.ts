import { Router } from 'express';

import WarehousesController from '../controllers/WarehousesController';

const warehousesRouter = Router();
const warehousesController = new WarehousesController();

warehousesRouter.get('/', warehousesController.show);

warehousesRouter.get('/:id', warehousesController.index);

warehousesRouter.delete('/', warehousesController.delete);

warehousesRouter.post('/', warehousesController.create);

warehousesRouter.put('/', warehousesController.update);

export default warehousesRouter;
