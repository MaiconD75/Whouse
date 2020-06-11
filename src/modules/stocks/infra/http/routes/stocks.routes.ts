import { Router } from 'express';

const StocksRouter = Router();

StocksRouter.get('/', async (request, response) => {
  return response.json({ ok: true });
});

export default StocksRouter;
