import express from 'express';
import authMiddleware from '../middlewares/need-signin.middleware.js';
import { UsersController } from '../controllers/users.controller.js';

const router = express.Router();
const usersController = new UsersController();

// API router 사용자 회원가입
router.post('/sign-up', usersController.createUser);
// API router 사용자 로그인
router.post('/log-in', usersController.loginUser);
// API router 사용자 비밀번호 수정
router.patch('/user-info', authMiddleware, usersController.updatePassword);
// API router 사용자 로그아웃
router.post('/log-out', authMiddleware, usersController.logoutUser);
// API router 사용자 계정 삭제
router.delete('/user-info', authMiddleware, usersController.deleteUser);
// API router 사용자 계정 조회
router.get('/user-info', authMiddleware, usersController.getUser);

export default router;
