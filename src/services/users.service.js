import { UsersRepository } from '../repositories/users.repository.js';

export class UsersService {
  usersRepository = new UsersRepository();
  // API SER 유저 생성
  createUser = async (email, name, password) => {
    const createdUser = await this.usersRepository.createUser(email, name, password);
    return {
      email: createdUser.email,
      name: createdUser.name,
      password: createdUser.password,
    };
  };
}
