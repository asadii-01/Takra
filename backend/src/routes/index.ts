import { Router, Request, Response } from 'express';
import authRoutes from './auth';
import competitionRoutes from './competitions';
import chatRoutes from './chat';
import aiRoutes from './ai';

const router = Router();

router.use('/auth', authRoutes);
router.use('/competitions', competitionRoutes);
router.use('/chat', chatRoutes);
router.use('/ai', aiRoutes);

router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

export default router;
