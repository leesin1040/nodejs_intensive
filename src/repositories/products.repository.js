import { prisma } from '../utils/prisma/index.js';
export class ProductsRepository {
  // API REP 상품 목록 조회
  findAllProducts = async () => {
    const products = await prisma.products.findMany();
    return products;
  };
  // API REP 상품 생성
  createProduct = async (userId, title, content) => {
    const createdProduct = await prisma.products.create({
      data: {
        UserId: userId,
        title,
        content,
      },
    });
    return createdProduct;
  };
}
