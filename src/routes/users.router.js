import express from 'express';
import { UsersController } from '../controllers/users.controller.js';

const router = express.Router();
const usersController = new UsersController();

// API router 사용자 회원가입
router.post('/', usersController.createUser);

// API router 사용자 로그인

export default router;
