import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ProductsController from '../controllers/ProductsController';
import ProductsImageController from '../controllers/ProductsImageController';

const productsRouter = Router();
const upload = multer(uploadConfig);

const productsController = new ProductsController();
const productsImageController = new ProductsImageController();

productsRouter.post('/', productsController.create);

productsRouter.delete('/', productsController.delete);

productsRouter.put('/', productsController.update);

productsRouter.patch(
  '/:id',
  upload.single('image'),
  productsImageController.update,
);

export default productsRouter;
