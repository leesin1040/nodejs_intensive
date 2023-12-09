import { UsersService } from '../services/users.service.js';

export class UsersController {
  usersService = new UsersService();
  // API CON 유저 회원가입
  createUser = async (req, res, next) => {
    try {
      const { email, name, password } = req.body;

      const createdUser = await this.usersService.createUser(email, name, password);

      return res.status(201).json({ data: createdUser });
    } catch (err) {
      next(err);
    }
  };
}
