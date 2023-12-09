import express from 'express';
import authMiddleware from '../middlewares/need-signin.middleware.js';
import { UsersController } from '../controllers/users.controller.js';

const router = express.Router();
const usersController = new UsersController();

// API router 사용자 회원가입
router.post('/sign_up', usersController.createUser);
// API router 사용자 로그인
router.post('/log_in', usersController.loginUser);
// API router 사용자 비밀번호 수정
router.patch('/userInfo', authMiddleware, usersController.updatePassword);
// API router 사용자 로그아웃
router.delete('/logout', authMiddleware, usersController.logoutUser);
// API router 사용자 계정삭제
router.delete('/deleteUser', authMiddleware, usersController.deleteUser);
// API router 사용자 계정 조회
router.get('/userInfo', authMiddleware, usersController.getUser);
export default router;
