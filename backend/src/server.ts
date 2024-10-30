import express, { Request, Response, NextFunction } from "express";
import { router } from './routes';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.use((erro: Error, req: Request, res: Response, next: NextFunction) => {
    if (erro instanceof Error) {
        //Se for uma instancia do tipo erro:
        return res.status(400).json({
            error: erro.message
        })
    }

    return res.status(500).json({
        status: 'Error',
        mensgem: 'Internal server error.'
    })
})

app.listen(3333, () => console.log('Servidor online!'))