import { Router, Request, Response } from 'express';
import Competition from '../models/Competition';
import { protect, admin, AuthRequest } from '../middleware/authMiddleware';

const router = Router();

// Get all competitions (Public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const competitions = await Competition.find().sort({ startDate: 1 });
    res.json(competitions);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a competition (Admin only)
router.post('/', protect, admin, async (req: Request, res: Response) => {
  try {
    const { title, description, startDate, endDate, type, prizePool } = req.body;
    const newCompetition = new Competition({
      title,
      description,
      startDate,
      endDate,
      type,
      prizePool
    });
    const savedCompetition = await newCompetition.save();
    res.status(201).json(savedCompetition);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a competition (Admin only)
router.delete('/:id', protect, admin, async (req: Request, res: Response) => {
  try {
    const competition = await Competition.findById(req.params.id);

    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }

    await competition.deleteOne();
    res.json({ message: 'Competition removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Join a competition (Protected User)
// Note: Using 'any' for req to avoid TS issues with AuthRequest incompat in route definitions if strict
router.post('/:id/join', protect, async (req: any, res: Response) => {
  try {
    const userId = req.user._id; // Get from protected token
    const competition = await Competition.findById(req.params.id);

    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }

    if (competition.participants.includes(userId)) {
      return res.status(400).json({ message: 'Already registered' });
    }

    competition.participants.push(userId);
    await competition.save();

    res.json({ message: 'Successfully joined competition' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
