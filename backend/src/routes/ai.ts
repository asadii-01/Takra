import { Router, Request, Response } from 'express';
import { getChatResponse } from '../services/aiService';

const router = Router();

router.post('/chat', async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    // If no API key is set, return a mock response to avoid crashing
    if (!process.env.GROQ_API_KEY) {
        return res.json({ response: "I'm in mock mode because no GROQ_API_KEY was found. But I heard you say: " + message });
    }

    const response = await getChatResponse(message);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

export default router;
