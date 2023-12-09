import bcrypt from 'bcrypt';
import { UsersRepository } from '../repositories/users.repository.js';
import dotenv from 'dotenv';
dotenv.config();

export class UsersService {
  usersRepository = new UsersRepository();

  // API SER 유저 생성
  createUser = async (email, name, password, confirmPassword) => {
    // email 중복 확인
    const existEmail = await this.usersRepository.findByEmail(email);
    if (existEmail) {
      const err = new Error('이미 사용중인 이메일입니다.');
      err.statusCode = 409;
      throw err;
    }
    if (password !== confirmPassword) {
      const err = new Error('입력하신 비밀번호가 일치하지 않습니다.');
      err.statusCode = 400;
      throw err;
    }
    // 비밀번호 해쉬
    const hashedPassword = await bcrypt.hash(password, 10);
    // 회원정보 레포지토리로 전달 - 해쉬한 비번 전달하고, 쌩비번 다시 알려주기
    const createdUser = await this.usersRepository.createUser(email, name, hashedPassword);
    return {
      email: createdUser.email,
      name: createdUser.name,
      password: password,
    };
  };

  // API SER 로그인
  loginUser = async (email, password) => {
    const existEmail = await this.usersRepository.findByEmail(email);
    if (!existEmail) {
      const err = new Error('등록되지 않은 이메일입니다.');
      err.statusCode = 409;
      throw err;
    }
    // 비밀번호 체크
    const comparePassword = await bcrypt.compare(password, existEmail.password);
    if (!comparePassword) {
      const err = new Error('비밀번호가 일치하지 않습니다.');
      err.statusCode = 400;
      throw err;
    }
    const userId = existEmail.userId;
    return {
      userId,
    };
  };

  // API SER 유저 비밀번호 수정
  updatePassword = async (userId, password, newPassword, confirmPassword) => {
    const existId = await this.usersRepository.findById(userId);
    const comparePassword = await bcrypt.compare(password, existId.password);
    if (!comparePassword) {
      const err = new Error('비밀번호가 일치하지 않습니다.');
      err.statusCode = 400;
      throw err;
    }
    if (newPassword !== confirmPassword) {
      const err = new Error('새 비밀번호가 일치하지 않습니다.');
      err.statusCode = 400;
      throw err;
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedPassword = await this.usersRepository.updatePassword(userId, hashedPassword);
    return { message: '비밀번호가 변경되었습니다.' };
  };
  // API SER 유저 계정 삭제
  deleteUser = async (userId, password) => {
    const existId = await this.usersRepository.findById(userId);
    const comparePassword = await bcrypt.compare(password, existId.password);
    if (!comparePassword) {
      const err = new Error('비밀번호가 일치하지 않습니다.');
      err.statusCode = 400;
      throw err;
    }
    const deletedUser = await this.usersRepository.deleteUser(userId);
    return { message: '계정이 삭제되었습니다.' };
  };
  // API SER 유저 계정 조회
  getUser = async (userId) => {
    const existId = await this.usersRepository.findByIdInfo(userId);
    return { data: existId };
  };
}
