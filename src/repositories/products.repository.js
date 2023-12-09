import { prisma } from '../utils/prisma/index.js';
export class ProductsRepository {
  findByProductId = async (productId) => {
    return prisma.products.findUnique({ where: { productId } });
  };
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
  // API REP 상품 수정
  updateProduct = async (productId, title, content, status) => {
    const updatedProduct = await prisma.products.update({
      where: { productId: productId },
      data: { title: title, content: content, status: status },
    });
    return updatedProduct;
  };
  // API REP 상품 조회
  getProduct = async (productId) => {
    const gotProduct = await prisma.products.findUnique({
      where: { productId: productId },
      select: {
        productId: true,
        UserId: true,
        title: true,
        content: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!gotProduct) {
      const err = new Error('상품이 존재하지 않습니다.');
      err.statusCode = 400;
      throw err;
    }
    return gotProduct;
  };
  // API REP 상품 삭제
  deleteProduct = async (productId) => {
    const deletedProduct = await prisma.products.delete({
      where: { productId: productId },
    });
    return deletedProduct;
  };
}
