import { Router, Request, Response } from 'express';
import 'express-async-errors';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';

import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { SendOrderServiceController } from './controllers/order/SendOrderServiceController';
import { ListOrderController } from './controllers/order/ListOrderController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';


import uploadConfig from './config/multer';

const router = Router();

router.get('/v1/statusapi', (req: Request, res: Response) => {
    try {
        return res.json({ status: "Ok" })
    } catch (error) {
        throw new Error('Erro ao tentar realizar esta requisção!')
    }
})

const upload = multer(uploadConfig.upload("./tmp"));

// -- ROTAS USER --
router.post('/users', new CreateUserController().handle);

router.post('/session', new AuthUserController().handle);

router.get('/userinfo', isAuthenticated, new DetailUserController().handle);

// -- ROTAS CATEGORY --
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/category', isAuthenticated, new ListCategoryController().handle);

// -- ROTAS PRODUCT --
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle);

// -- ROTAS ORDER -- 
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/order', isAuthenticated, new RemoveOrderController().handle);

router.post('/order/add', isAuthenticated, new AddItemController().handle);
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle);

router.put('/order/send', isAuthenticated, new SendOrderServiceController().handle);
router.get('/orders', isAuthenticated, new ListOrderController().handle);
router.get('/orders/detail', isAuthenticated, new DetailOrderController().handle);
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle);

export { router };