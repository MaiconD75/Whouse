import { Router } from 'express';

import StocksController from '../controllers/StocksController';

const stocksRouter = Router();
const stocksController = new StocksController();

stocksRouter.get('/:id', stocksController.index);

stocksRouter.post('/', stocksController.create);

stocksRouter.put('/', stocksController.update);

stocksRouter.delete('/', stocksController.delete);

export default stocksRouter;
