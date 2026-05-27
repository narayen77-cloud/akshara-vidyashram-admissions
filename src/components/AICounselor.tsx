import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, CalendarDays, Loader2, Play } from 'lucide-react';
import { Message } from '../types';

interface AICounselorProps {
  onScrollToSection: (sectionId: string) => void;
}

const STARTER_PROMPTS = [
  "Does the school offer swimming and karate?",
  "What is the eligibility requirements for LKG?",
  "Does the school offer school-buses across Cuddalore?",
  "What makes Akshara Vidyaashram a premium sanctuary?"
];

export default function AICounselor({ onScrollToSection }: AICounselorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m0",
      role: 'model',
      text: "Hello! I am your AI Admissions Counselor of Akshara Vidyaashram. Let me guide you through our 25-Acre Sanctuary. Or click 'Review Eligibility' below!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: 'usr-' + Date.now(),
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      // Build brief chat transcript context from history
      const historyContext = messages.map(m => ({ role: m.role, text: m.text }));

      const res = await fetch('/api/admissions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, history: historyContext })
      });

      const data = await res.json();
      
      const modelMsg: Message = {
        id: 'model-' + Date.now(),
        role: 'model',
        text: data.text || "I am here to guide you. Feel free to ask more details!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, modelMsg]);

    } catch (err) {
      console.error("AI chat error:", err);
      // Fallback answers
      const modelErrorMsg: Message = {
        id: 'err-' + Date.now(),
        role: 'model',
        text: "I am briefly offline. Our admissions officer would love to speak to you. Please register inside the 'Admissions Enquiry' form below!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, modelErrorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans" id="ai-counselor-widget">
      {/* Balloon Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-[#9c1e22] hover:bg-red-800 text-white font-bold p-4 sm:px-5 sm:py-4 rounded-full shadow-2xl transition-all hover:scale-105 group border border-solid border-gold-400 cursor-pointer"
          id="ai-counselor-toggle-balloon"
        >
          <MessageSquare className="w-5.5 h-5.5 text-gold-400 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline text-xs font-mono uppercase tracking-widest text-white">
            Ask Counselor AI
          </span>
          {/* Subtle glowing dot */}
          <span className="absolute top-1 right-1 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-white animate-ping" />
          <span className="absolute top-1 right-1 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-white" />
        </button>
      )}

      {/* Actual Chat Drawer */}
      {isOpen && (
        <div 
          className="bg-white border border-gray-200 rounded-2xl shadow-2xl w-[90vw] sm:w-[380px] h-[520px] flex flex-col overflow-hidden animate-fadeIn"
          id="ai-chat-container"
        >
          {/* Chat Header */}
          <div className="bg-navy-900 px-4 py-4.5 text-white flex items-center justify-between border-b border-navy-950">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-navy-850 rounded-lg text-gold-400 border border-gold-500/25">
                <Bot className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-white tracking-tight font-heading">Akshara Admission AI</h4>
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] text-gray-400 font-mono tracking-wider">Expert Advisor Active</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
              aria-label="Close panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gray-50/50">
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div 
                  key={m.id} 
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-start gap-2 max-w-[85%] ${isUser ? 'ml-auto' : 'mr-auto'}`}
                >
                  {!isUser && (
                    <div className="h-6 w-6 rounded-full bg-navy-800 flex items-center justify-center text-gold-400 text-[10px] shrink-0 mt-1 font-bold">
                      A
                    </div>
                  )}
                  <div className={`rounded-xl px-3.5 py-2.5 shadow-5xs border text-xs leading-relaxed text-left ${
                    isUser 
                      ? 'bg-navy-800 border-navy-800 text-white' 
                      : 'bg-white border-gray-150 text-gray-800'
                  }`}>
                    {m.text}
                    <span className={`block text-[8px] font-mono mt-1 text-right  ${isUser ? 'text-gray-400' : 'text-gray-500'}`}>
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start items-center gap-2 max-w-[80%]">
                <div className="h-6 w-6 rounded-full bg-navy-800 flex items-center justify-center text-gold-400 text-[10px] shrink-0 font-bold">
                  A
                </div>
                <div className="bg-white border border-gray-150 rounded-xl px-4 py-2 flex items-center gap-1.5 shadow-5xs">
                  <Loader2 className="w-4.5 h-4.5 text-navy-800 animate-spin" />
                  <span className="text-xs text-gray-500 font-medium">Counselor in typing process...</span>
                </div>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>

          {/* Contextual Suggestions Chips */}
          <div className="px-4 py-2.5 bg-white border-t border-gray-100 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none" id="chat-quickups">
            {STARTER_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="text-[10px] bg-gray-100 border border-gray-200 text-gray-700 font-semibold px-2.5 py-1 rounded-full cursor-pointer hover:bg-[#9c1e22] hover:text-white hover:border-transparent transition-colors shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Sender bar */}
          <div className="p-3 bg-white border-t border-gray-150 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask anything about admissions, facilities..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage(inputText);
              }}
              className="flex-1 px-3 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#9c1e22]"
            />
            <button
              onClick={() => handleSendMessage(inputText)}
              className="bg-[#9c1e22] hover:bg-red-800 text-white hover:text-gold-400 p-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Schedule direct link */}
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[10px] font-mono uppercase tracking-wide">
            <span className="text-gray-500">Ready to book a slot?</span>
            <button
              onClick={() => {
                setIsOpen(false);
                onScrollToSection('booking-section');
              }}
              className="text-[#9c1e22] font-semibold text-[10px] flex items-center gap-0.5 hover:underline"
            >
              <span>Book Visit</span>
              <CalendarDays className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
