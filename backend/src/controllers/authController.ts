import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/authMiddleware';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'default_secret', {
    expiresIn: '30d',
  });
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const user = await User.create({ username, email, password });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id as unknown as string),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error: any) {
     res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id as unknown as string),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  const user = {
    _id: req.user?._id,
    username: req.user?.username,
    email: req.user?.email,
    role: req.user?.role,
  };
  res.status(200).json(user);
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?._id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id as unknown as string),
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
