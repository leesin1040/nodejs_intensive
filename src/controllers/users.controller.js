import { UsersService } from '../services/users.service.js';

export class UsersController {
  usersService = new UsersService();
  // API CON 유저 회원가입
  createUser = async (req, res, next) => {
    try {
      const { email, name, password, confirmPassword } = req.body;
      // 데이터 유무 확인
      if (!email || !name || !password || !confirmPassword) {
        const err = new Error('필수정보가 누락되었습니다.');
        err.statusCode = 400;
        throw err;
      }
      const createdUser = await this.usersService.createUser(
        email,
        name,
        password,
        confirmPassword,
      );
      return res.status(201).json({ data: createdUser });
    } catch (err) {
      // 이메일 중복
      if (err.statusCode === 409) {
        return res.status(409).json({ errorMessage: err.message });
      }
      // 400번 에러
      if (err.statusCode === 400) {
        return res.status(400).json({ errorMessage: err.message });
      }
      next(err);
    }
  };
  // API CON 유저 로그인 -jwt
  loginUser = async (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  };
}
