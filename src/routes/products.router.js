import express from 'express';
import { ProductsController } from '../controllers/products.controller';

const router = express.Router();
const productsController = new ProductsController();

// --상품 조회
router.get('/products', productsController.getProducts);

// --상품 생성
router.post('/products', productsController.createProduct);

export default router;
