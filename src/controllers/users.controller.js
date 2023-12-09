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
      // 유저 데이터 생성
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
      const { email, password } = req.body;
      // 데이터 입력 여부 확인
      if (!email || !password) {
        const err = new Error('필수정보가 누락되었습니다.');
        err.statusCode = 400;
        throw err;
      }
      // 로그인 된 유저 서비스로 보내기 - Service에서 userId받아오기
      const loggedInUser = await this.usersService.loginUser(email, password);
      req.session.userId = loggedInUser.userId;
      return res.status(200).json({ success: true, message: '로그인 되었습니다.' });
    } catch (err) {
      if (err.statusCode === 400) {
        return res.status(400).json({ errorMessage: err.message });
      }
      next(err);
    }
  };
  // API CON 유저 비밀번호 수정
  getUserInfo = async (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  };
}
