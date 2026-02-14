'use client';

import { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Send, User } from 'lucide-react';
import Cookies from 'js-cookie';
import { API_URL, SOCKET_URL } from '@/lib/config';

interface Message {
  _id: string;
  sender: string;
  username: string;
  content: string;
  createdAt: string;
}

let socket: Socket;

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [user, setUser] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize user
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }

    // Connect to Socket.io
    socket = io(SOCKET_URL);

    // Load history
    fetchHistory();

    // Socket events
    socket.emit('join_chat', { username: user?.username || 'Guest' });

    socket.on('receive_message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchHistory = async () => {
    try {
      const token = Cookies.get('token');
      const res = await fetch(`${API_URL}/chat/history`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error('Failed to load chat history');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user) return;

    socket.emit('send_message', {
      userId: user._id, // Ensure we use _id as per backend expectation
      username: user.username,
      content: input
    });

    setInput('');
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col rounded-xl border border-[#A2C2E1]/20 bg-[#162032] overflow-hidden">
      {/* Header */}
      <div className="border-b border-[#A2C2E1]/10 bg-[#1B263B] p-4">
        <h2 className="text-lg font-bold text-white">Community Chat</h2>
        <p className="text-xs text-[#A2C2E1]/60">Live discussion with other participants</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          const isMe = user && msg.sender === user._id; // Compare with _id
          return (
            <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-lg p-3 ${
                isMe 
                  ? 'bg-[#A2C2E1] text-[#1B263B]' // My messages: Light Blue
                  : 'bg-[#1B263B] text-white border border-[#A2C2E1]/10' // Others: Dark
              }`}>
                {!isMe && (
                  <p className="mb-1 text-xs font-bold text-[#A2C2E1]">{msg.username}</p>
                )}
                <p className="text-sm">{msg.content}</p>
                <p className={`mt-1 text-[10px] ${isMe ? 'text-[#1B263B]/60' : 'text-[#A2C2E1]/50'} text-right`}>
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="border-t border-[#A2C2E1]/10 bg-[#1B263B] p-4 flex gap-2">
        <input
          className="flex-1 rounded-lg border border-[#A2C2E1]/20 bg-[#162032] px-4 py-2 text-white placeholder-[#A2C2E1]/50 focus:border-[#A2C2E1] focus:outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" disabled={!input.trim()}>
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
}
