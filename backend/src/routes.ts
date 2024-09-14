import {Router, Request, Response } from 'express';
import 'express-async-errors';
import { CreateUserController } from './controllers/user/CreateUserController'

const router = Router();

router.get('/v1/statusapi', (req: Request, res: Response) => {
    try {
        return res.json({status: "Ok"})
    } catch (error) {
        throw new Error('Erro ao tentar realizar esta requisção!')
    }
})

router.post('/users', new CreateUserController().handle)

export { router };