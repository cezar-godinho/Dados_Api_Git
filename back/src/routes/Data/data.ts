import express, { Request, Response } from 'express';
import { dataController } from '../../controllers';

export const router = express.Router({
    strict: true
});

router.post('/', (req: Request, res: Response) => {
    dataController.create(req, res);
});

router.get('/', (req: Request, res: Response) => {
    dataController.read(req, res);
});

router.patch('/', (req: Request, res: Response) => {
    dataController.update(req, res);
});

router.delete('/', (req: Request, res: Response) => {
    dataController.delete(req, res);
});