import { prisma } from '../utils/prisma/index.js';

export class UsersRepository {
  findByEmail = async (email) => {
    return prisma.users.findUnique({ where: { email } });
  };
  findById = async (id) => {
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
}
