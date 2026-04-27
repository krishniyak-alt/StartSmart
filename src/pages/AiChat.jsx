import React, { useState, useRef, useEffect } from 'react';
import PageTransition from '../components/layout/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { Send, Bot, User, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AiChat = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your StartSmart AI guide. What would you like to learn about today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const suggestedDomains = ['Data Science', 'AI/ML', 'UI/UX'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text = input) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok) {
        throw new Error("Backend server error. Is it running?");
      }

      const data = await res.json();

      const botMessage = {
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setError('Failed to connect to the backend server. Make sure you ran `node server.js` in the backend folder.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">StartSmart AI Guide</h1>
        <p className="text-text-muted">Ask questions, get explanations, and receive guidance.</p>
      </div>

      <GlassCard className="flex-1 flex flex-col p-4 overflow-hidden shadow-2xl border-primary/20" hover={false}>
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-4 flex items-center gap-2 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <Bot size={18} />
                  </div>
                )}
                <div 
                  className={`px-4 py-3 rounded-2xl max-w-[80%] ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-sm' 
                      : 'bg-surface border border-border text-text rounded-tl-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center shrink-0">
                    <User size={18} />
                  </div>
                )}
              </motion.div>
            ))}
            
            {/* Suggested Domains UI */}
            {messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-wrap gap-2 mt-4 ml-11"
              >
                {suggestedDomains.map((domain) => (
                  <button
                    key={domain}
                    onClick={() => handleSend(`Tell me more about ${domain}`)}
                    className="px-4 py-2 rounded-full text-sm font-medium border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                  >
                    {domain}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Typing Effect */}
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                  <Bot size={18} />
                </div>
                <div className="px-4 py-4 rounded-2xl bg-surface border border-border rounded-tl-sm flex flex-col gap-2">
                  <span className="text-xs text-text-muted italic">AI is typing...</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <div className="mt-4 pt-4 border-t border-border flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary text-text transition-all"
          />
          <Button onClick={() => handleSend()} disabled={isLoading || !input.trim()} className="px-4 shrink-0 rounded-xl">
            <Send size={18} />
          </Button>
        </div>
      </GlassCard>
    </PageTransition>
  );
};

export default AiChat;
