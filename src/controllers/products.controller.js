import { ProductsService } from '../services/products.service';

export class ProductsController {
  productsService = new ProductsService();
  // --게시글 조회
  getProducts = async (req, res, next) => {
    try {
      const products = await this.productsService.findAllProducts();

      return res.status(200).json({ data: products });
    } catch (err) {
      next(err);
    }
  };
  // --게시글 생성
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
