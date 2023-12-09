import express from 'express';
import { ProductsController } from '../controllers/products.controller.js';

const router = express.Router();
const productsController = new ProductsController();

// --상품 조회
router.get('/', productsController.getProducts);

// --상품 생성
router.post('/', productsController.createProduct);

export default router;
