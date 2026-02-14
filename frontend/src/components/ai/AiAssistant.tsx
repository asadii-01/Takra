'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, X, Send, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I am Takra AI. How can I help you navigate the festival?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-xl border border-[#A2C2E1]/20 bg-[#162032] shadow-2xl shadow-blue-500/10 animate-in slide-in-from-bottom-5 fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#A2C2E1]/10 bg-[#1B263B] p-4">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#A2C2E1]" />
              <h3 className="font-bold text-white">Takra AI</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[#A2C2E1]/60 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-lg p-3 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#A2C2E1] text-[#1B263B]' 
                    : 'bg-[#1B263B] text-[#F0F8FF] border border-[#A2C2E1]/10'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-lg bg-[#1B263B] p-3 text-sm border border-[#A2C2E1]/10 flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A2C2E1] animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A2C2E1] animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A2C2E1] animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="border-t border-[#A2C2E1]/10 bg-[#1B263B] p-3">
            <div className="relative">
              <input
                className="w-full rounded-lg border border-[#A2C2E1]/20 bg-[#162032] pl-4 pr-10 py-2 text-sm text-white placeholder-[#A2C2E1]/50 focus:border-[#A2C2E1] focus:outline-none"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
              <button 
                type="submit" 
                disabled={!input.trim() || loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#A2C2E1] hover:text-white disabled:opacity-50 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#A2C2E1] text-[#1B263B] shadow-lg shadow-blue-500/20 transition-all hover:bg-white hover:scale-105 active:scale-95"
      >
        {isOpen ? <X size={24} /> : <Bot size={28} />}
      </button>
    </div>
  );
}
