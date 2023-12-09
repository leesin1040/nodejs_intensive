import express from 'express';
import ProductsRouter from './products.router.js';

const router = express.Router();

router.use('/products', ProductsRouter);

export default router;
