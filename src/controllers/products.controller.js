import { ProductsService } from '../services/products.service.js';

export class ProductsController {
  productsService = new ProductsService();
  // API CON 상품 목록 조회
  getProducts = async (req, res, next) => {
    try {
      const products = await this.productsService.findAllProducts();

      return res.status(200).json({ data: products });
    } catch (err) {
      next(err);
    }
  };
  // API CON 상품 생성
  createProduct = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { title, content } = req.body;
      // 데이터 유무 확인
      if (!title || !content) {
        const err = new Error('상품 정보를 입력해주세요');
        err.statusCode = 400;
        throw err;
      }
      // 상품 생성
      const createdProduct = await this.productsService.createProduct(userId, title, content);
      return res.status(201).json({ data: createdProduct });
    } catch (err) {
      // 400번 에러처리
      if (err.statusCode === 400) {
        return res.status(400).json({ errorMessage: err.message });
      }
      next(err);
    }
  };
  // API CON 상품 수정
  updateProduct = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { title, content, status } = req.body;
      if (!title || !content || !status) {
        const err = new Error('상품 정보를 입력해주세요.');
        err.statusCode = 400;
        throw err;
      }
      const updatedProduct = await this.productsService.updateProduct(
        +productId,
        title,
        content,
        status,
      );
      return res.status(200).json({ data: updatedProduct });
    } catch (err) {
      if (err.statusCode === 400) {
        return res.status(400).json({ errorMessage: err.message });
      }
      next(err);
    }
  };
}
