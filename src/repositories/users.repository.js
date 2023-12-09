import { prisma } from '../utils/prisma/index.js';

export class UsersRepository {
  findByEmail = async (email) => {
    return prisma.users.findUnique({ where: { email } });
  };
  findById = async (userId) => {
    return prisma.users.findUnique({ where: { userId } });
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
}
