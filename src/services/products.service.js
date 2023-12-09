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
  createProduct = async (userId, title, content) => {
    const createdProduct = await this.productsRepository.createProduct(userId, title, content);
    return { data: createdProduct };
  };
  // API SER 상품 수정
  updateProduct = async (userId, productId, title, content, status) => {
    const foundProduct = await this.productsRepository.findProduct(productId);
    if (foundProduct.UserId !== userId) {
      const err = new Error('수정 권한이 없습니다.');
      err.statusCode = 400;
      throw err;
    }
    const updatedProduct = await this.productsRepository.updateProduct(
      productId,
      title,
      content,
      status,
    );
    return { data: updatedProduct };
  };
  // API 상품 상세 조회
  getProduct = async (productId) => {
    const gotProduct = await this.productsRepository.getProduct(productId);
    return gotProduct;
  };
  // API SER 상품 삭제
  deleteProduct = async (userId, productId) => {
    const existProduct = await this.productsRepository.findByProductId(productId);
    if (existProduct.UserId !== userId) {
      const err = new Error('삭제 권한이 없습니다.');
      err.statusCode = 400;
      throw err;
    }
    const deletedProduct = await this.productsRepository.deleteProduct(productId);
    return { message: '상품이 삭제되었습니다.' };
  };
}
