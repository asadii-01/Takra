import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/takra');
    console.log('MongoDB Connected');

    const adminEmail = 'admin@takra.com';
    const adminExists = await User.findOne({ email: adminEmail });

    if (adminExists) {
      if (adminExists.role !== 'admin') {
        adminExists.role = 'admin';
        await adminExists.save();
        console.log('Existing user updated to Admin');
      } else {
        console.log('Admin user already exists');
      }
    } else {
      await User.create({
        username: 'admin',
        email: adminEmail,
        password: 'adminpassword123', // In real app, hash this, but pre-save hook handles it
        role: 'admin'
      });
      console.log('Admin user created');
    }

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();
