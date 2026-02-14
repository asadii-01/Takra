import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Competition from '../src/models/Competition';

dotenv.config();

const seedCompetitions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/takra');
    console.log('MongoDB Connected');

    await Competition.deleteMany({});

    const competitions = [
      {
        title: 'Neon Nights Art Brawl',
        description: 'Submit your best cyberpunk-themed digital art. Top 3 win cash prizes.',
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 days
        type: 'Art',
        prizePool: '$500',
        participants: []
      },
      {
        title: 'Future Tech Hackathon',
        description: 'Build an AI-powered app in 48 hours. Teams of up to 4.',
        startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        type: 'Tech',
        prizePool: '$2000',
        participants: []
      },
      {
        title: 'UI/UX Design Challenge',
        description: 'Redesign a popular app interface with better UX.',
        startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        type: 'Design',
        prizePool: '$300',
        participants: []
      }
    ];

    await Competition.insertMany(competitions);
    console.log('Competitions seeded successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedCompetitions();
