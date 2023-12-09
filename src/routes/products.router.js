import express from 'express';
import authMiddleware from '../middlewares/need-signin.middleware.js';
import { ProductsController } from '../controllers/products.controller.js';

const router = express.Router();
const productsController = new ProductsController();

//  API router 상품 조회
router.get('/', productsController.getProducts);
//  API router 상품 생성
router.post('/', authMiddleware, productsController.createProduct);
//  API router 상품 수정
router.patch('/:productId', authMiddleware, productsController.updateProduct);
//  API router 상품 삭제
router.delete('/:productId', authMiddleware, productsController.updateProduct);
export default router;
