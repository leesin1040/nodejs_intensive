import express from 'express';
import authMiddleware from '../middlewares/need-signin.middleware.js';
import { ProductsController } from '../controllers/products.controller.js';

const router = express.Router();
const productsController = new ProductsController();

// --상품 조회
router.get('/', productsController.getProducts);

// --상품 생성
router.post('/', authMiddleware, productsController.createProduct);

export default router;
