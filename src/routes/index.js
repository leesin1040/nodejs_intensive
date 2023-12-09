import express from 'express';
import ProductsRouter from './products.router.js';
import UsersRouter from './users.router.js';

const router = express.Router();

router.use('/products', ProductsRouter);
router.use('/user', UsersRouter);

export default router;
