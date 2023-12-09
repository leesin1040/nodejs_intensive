import express from 'express';
import ProductsRouter from './products.router';

const router = express.Router();

router.use('/products', ProductsRouter);

export default router;
