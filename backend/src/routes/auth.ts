import express from 'express';
import { registerUser, loginUser, getMe, updateProfile } from '../controllers/authController';
import { protect, AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe as any);
router.put('/profile', protect, updateProfile as any);

export default router;
