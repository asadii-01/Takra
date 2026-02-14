import app from './app';
import connectDB from './config/db';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io'; // Import Server

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "https://takra-ucp.vercel.app", // Allow frontend to connect
    methods: ["GET", "POST"]
  }
});

import Message from './models/Message';

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join_chat', (data) => {
    socket.join('community_chat');
    console.log(`User ${data.username} joined chat`);
  });

  socket.on('send_message', async (data) => {
    try {
      const { userId, username, content } = data;
      
      // Save to DB
      const newMessage = new Message({
        sender: userId,
        username,
        content
      });
      await newMessage.save();

      // Broadcast to all clients in the room
      io.to('community_chat').emit('receive_message', {
        _id: newMessage._id,
        sender: userId,
        username,
        content,
        createdAt: newMessage.createdAt
      });
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
