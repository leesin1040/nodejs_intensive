import express from 'express';
import { UsersController } from '../controllers/users.controller.js';

const router = express.Router();
const usersController = new UsersController();

// API router 사용자 회원가입
router.post('/sign_up', usersController.createUser);
// API router 사용자 로그인
router.post('/log_in', usersController.loginUser);

export default router;
