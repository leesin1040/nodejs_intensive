import jwt from 'jsonwebtoken';
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
  // 서비스에서 비번 체크 - 해쉬해서 레포지토리에 보내기
  // 서비스에서 아이디 체크 후 jwt토큰 발급
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
}
