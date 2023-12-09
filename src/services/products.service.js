import { ProductsRepository } from '../repositories/products.repository.js';

export class ProductsService {
  productsRepository = new ProductsRepository();
  // API SER 상품 목록 조회
  findAllProducts = async () => {
    const products = await this.productsRepository.findAllProducts();
    //내림차순 정렬
    products.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    //content제외 controller에 response전달
    return products.map((product) => {
      return {
        productId: product.productId,
        UserId: product.UserId,
        title: product.title,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
    });
  };
  // API SER 상품 생성
  createProduct = async (title, content) => {
    const createdProduct = await this.ProductsRepository.createProduct(title, content);
    return {
      title: createdProduct.title,
      content: createdProduct.content,
      createdAt: createdProduct.createdAt,
      updatedAt: createdProduct.updatedAt,
    };
  };
}
