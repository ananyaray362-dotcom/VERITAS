import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      content: 'Hello! I am the Veritas AI Advisor. If you have clicked a suspicious link or need guidance on protective measures, please let me know what happened.'
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { id: Date.now(), role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: 'bot',
        content: "I'm currently in demo mode, but in a full implementation, I would analyze your situation and provide step-by-step security measures to secure your accounts and devices."
      }]);
    }, 1000);
  };

  return (
    <div className="pt-24 pb-6 px-4 md:px-6 min-h-[90vh] flex flex-col max-w-5xl mx-auto">
      <div className="flex-1 glass rounded-3xl border border-white/10 flex flex-col overflow-hidden backdrop-blur-xl bg-gray-950/40 mt-8 mb-12 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gray-900/50 flex items-center space-x-4">
          <div className="p-3 bg-accent-400/20 rounded-xl">
            <Bot className="w-6 h-6 text-accent-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Veritas AI Advisor</h2>
            <p className="text-sm text-gray-400">Security & Protection Guidance</p>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id}
              className={`flex items-start space-x-4 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div className={`p-2 rounded-full flex-shrink-0 ${msg.role === 'user' ? 'bg-accent-400' : 'bg-accent-400/20'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-primary-950" /> : <Bot className="w-5 h-5 text-accent-400" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl p-4 shadow-lg ${
                msg.role === 'user' 
                  ? 'bg-accent-400 text-primary-950 rounded-tr-none font-medium' 
                  : 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-none'
              }`}>
                <p className="leading-relaxed">{msg.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Form */}
        <div className="p-6 border-t border-white/10 bg-gray-900/50">
          <form onSubmit={handleSubmit} className="relative flex items-center group">
            <div className="absolute inset-0 bg-accent-400/10 rounded-2xl blur-xl group-focus-within:bg-accent-400/20 transition-all duration-500 opacity-50"></div>
            <div className="relative w-full flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question about a suspicious link or security measure..."
                className="w-full bg-black/60 border border-white/10 rounded-2xl py-4 pl-6 pr-16 text-white focus:outline-none focus:border-accent-400/50 transition-colors placeholder:text-gray-500"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="absolute right-2 p-2.5 bg-accent-400 text-primary-950 rounded-xl hover:bg-accent-300 disabled:opacity-50 disabled:hover:bg-accent-400 transition-colors shadow-lg"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
