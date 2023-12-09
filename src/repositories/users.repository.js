import { prisma } from '../utils/prisma/index.js';

export class UsersRepository {
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
