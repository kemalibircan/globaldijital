'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { MessageCircle, X, Send } from 'lucide-react';
import { getApiUrl } from '@/lib/api';
import ChatMessageContent from './ChatMessageContent';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

function ChatBotLogo() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  useEffect(() => setMounted(true), []);
  const logoSrc = !mounted ? '/logos/only-logo.png' : theme === 'dark' ? '/logos/only-logo-dark-mode.png' : '/logos/only-logo.png';
  return (
    <Image src={logoSrc} alt="Glob AI" width={40} height={40} className="w-10 h-10 object-contain rounded-full bg-white/90 dark:bg-white/90" />
  );
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Merhaba! Size nasıl yardımcı olabilirim?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const textToSend = inputText;
    setInputText('');
    setLoading(true);

    try {
      const res = await fetch(`${getApiUrl()}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });
      const data = await res.json();
      const replyText = data.reply || (res.ok ? '' : 'Yanıt alınamadı. Lütfen iletişime geçin: alikemal.bircan@globaldijital.com');
      if (!res.ok && !data.reply) {
        throw new Error(data.message || 'Server error');
      }
      const botMessage: Message = {
        id: Date.now() + 1,
        text: replyText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: 'Bağlantı hatası. Lütfen doğrudan bize yazın: alikemal.bircan@globaldijital.com veya 0534 612 46 42.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-trustworthy-blue rounded-full shadow-2xl hover:scale-110 hover:bg-blue-700 transition-all duration-300 flex items-center justify-center z-50 animate-pulse"
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-trustworthy-blue p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex-shrink-0">
                <ChatBotLogo />
              </div>
              <div>
                <h3 className="text-white font-semibold">Glob AI</h3>
                <p className="text-white text-xs opacity-90">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl p-3 ${
                    message.sender === 'user'
                      ? 'bg-trustworthy-blue text-white'
                      : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100'
                  }`}
                >
                  <ChatMessageContent
                    text={message.text}
                    allowMarkdown={message.sender === 'bot'}
                  />
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user'
                        ? 'text-white opacity-70'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('tr-TR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl p-3 text-gray-800 dark:text-gray-100 flex items-center gap-2">
                  <span className="w-2 h-2 bg-trustworthy-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-trustworthy-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-trustworthy-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">AI cevap veriyor, lütfen bekleyin...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Mesajınızı yazın..."
                className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-trustworthy-blue text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={loading}
                className="w-10 h-10 bg-trustworthy-blue rounded-full flex items-center justify-center hover:scale-110 hover:bg-blue-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

