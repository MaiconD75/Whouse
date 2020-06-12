import { Router } from 'express';

import StocksController from '../controllers/StocksController';

const stocksRouter = Router();
const stocksController = new StocksController();

stocksRouter.post('/', stocksController.create);

export default stocksRouter;
