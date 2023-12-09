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
  // API CON 유저 로그인
  loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      // 데이터 입력 여부 확인
      if (!email || !password) {
        const err = new Error('필수정보가 누락되었습니다.');
        err.statusCode = 400;
        throw err;
      }
      const loggedInUser = await this.usersService.loginUser(email, password);
      req.session.userId = loggedInUser.userId;
      return res.status(200).json({ success: true, message: '로그인 되었습니다.' });
    } catch (err) {
      if (err.statusCode === 409) {
        return res.status(409).json({ errorMessage: err.message });
      }
      if (err.statusCode === 400) {
        return res.status(400).json({ errorMessage: err.message });
      }
      next(err);
    }
  };
  // API CON 유저 비밀번호 수정
  updatePassword = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { password, newPassword, confirmPassword } = req.body;
      const updatedPassword = await this.usersService.updatePassword(
        userId,
        password,
        newPassword,
        confirmPassword,
      );
      return res.status(200).json({ data: updatedPassword });
    } catch (err) {
      if (err.statusCode === 400) {
        return res.status(400).json({ errorMessage: err.message });
      }
      next(err);
    }
  };
  // API CON 유저 로그아웃
  logoutUser = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ errorMessage: '로그아웃에 실패했습니다.' });
      }
      res.clearCookie('sessionId');
      return res.status(200).json({ success: true, message: '로그아웃 되었습니다.' });
    });
  };
  // API CON 유저 계정 삭제
  deleteUser = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { password } = req.body;
      const deletedUser = await this.usersService.deleteUser(userId, password);
      return res.status(200).json(deletedUser);
    } catch (err) {
      if (err.statusCode === 400) {
        return res.status(400).json({ errorMessage: err.message });
      }
      next(err);
    }
  };
  // API CON 유저 계정 조회
  getUser = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const gotUser = await this.usersService.getUser(userId);
      return res.status(200).json(gotUser);
    } catch (err) {
      if (err.statusCode === 400) {
        return res.status(400).json({ errorMessage: err.message });
      }
      next(err);
    }
  };
}
