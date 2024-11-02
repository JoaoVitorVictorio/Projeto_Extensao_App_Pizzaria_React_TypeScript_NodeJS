import { Router, Request, Response } from 'express';
import 'express-async-errors';
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';

const router = Router();

router.get('/v1/statusapi', (req: Request, res: Response) => {
    try {
        return res.json({ status: "Ok" })
    } catch (error) {
        throw new Error('Erro ao tentar realizar esta requisção!')
    }
})

// -- ROTAS USER --
router.post('/users', new CreateUserController().handle);

router.post('/session', new AuthUserController().handle);

router.get('/userinfo', isAuthenticated, new DetailUserController().handle);

// -- ROTAS CATEGORY --
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/category', isAuthenticated, new ListCategoryController().handle);

// -- ROTAS PRODUCT --
router.post('/product', isAuthenticated, new CreateProductController().handle);

export { router };