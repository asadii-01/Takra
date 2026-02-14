import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/authController';
import { protect, AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe as any);

export default router;
