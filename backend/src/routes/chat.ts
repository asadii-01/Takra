import { Router, Request, Response } from 'express';
import Message from '../models/Message';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Get chat history (Protected)
router.get('/history', protect, async (req: Request, res: Response) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();
    
    // Return in chronological order
    res.json(messages.reverse());
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
