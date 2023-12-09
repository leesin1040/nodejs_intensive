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
      const { title, content } = req.body;

      const createdProduct = await this.productsService.createProduct(title, content);

      return res.status(201).json({ data: createdProduct });
    } catch (err) {
      next(err);
    }
  };
}
