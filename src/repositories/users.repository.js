import { prisma } from '../utils/prisma/index.js';

export class UsersRepository {
  findByEmail = async (email) => {
    return prisma.users.findUnique({ where: { email } });
  };
  findById = async (userId) => {
    return prisma.users.findUnique({ where: { userId } });
  };
  // API REP 유저 계정 조회
  findByIdInfo = async (userId) => {
    return prisma.users.findUnique({
      where: { userId },
      select: { userId: true, email: true, name: true, createdAt: true, updatedAt: true },
    });
  };
  // API REP 유저 회원가입
  createUser = async (email, name, password) => {
    const createdUser = await prisma.users.create({
      data: {
        email,
        name,
        password,
      },
    });
    return createdUser;
  };
  // API REP 유저 비밀번호 수정
  updatePassword = async (userId, newPassword) => {
    const updatedPassword = await prisma.users.update({
      where: { userId: userId },
      data: { password: newPassword },
    });
  };
  // API REP 유저 계정 삭제
  deleteUser = async (userId) => {
    const deletedUser = await prisma.users.delete({
      where: { userId: userId },
    });
    return deletedUser;
  };
}
