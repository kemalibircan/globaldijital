'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Send, Sparkles } from 'lucide-react';
import { getApiUrl } from '@/lib/api';
import ChatMessageContent from './ChatMessageContent';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const quickQuestions = [
  'Web sitesi fiyatları nedir?',
  'Mobil uygulama geliştirme süresi ne kadar?',
  'SEO hizmeti neler içeriyor?',
  'Hangi dillerde hizmet veriyorsunuz?',
];

function ChatSectionLogo() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  useEffect(() => setMounted(true), []);
  const logoSrc = !mounted ? '/logos/only-logo.png' : theme === 'dark' ? '/logos/only-logo-dark-mode.png' : '/logos/only-logo.png';
  return (
    <Image src={logoSrc} alt="Glob AI" width={48} height={48} className="w-12 h-12 object-contain rounded-full bg-white flex-shrink-0" />
  );
}

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Merhaba! 👋 GlobalDijital\'e hoş geldiniz. Ben Glob AI, size nasıl yardımcı olabilirim?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = useCallback(async (text?: string) => {
    const messageText = (text ?? inputText).trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const res = await fetch(`${getApiUrl()}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
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
      setIsTyping(false);
    }
  }, [inputText]);

  const handleQuickQuestion = useCallback((question: string) => {
    handleSendMessage(question);
  }, [handleSendMessage]);

  return (
    <section className="relative py-20 z-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-trustworthy-blue/20 rounded-full mb-4">
              <Sparkles className="w-5 h-5 text-trustworthy-blue" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Glob AI</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Size Nasıl Yardımcı Olabiliriz?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Sorularınızı sorun, anında yanıt alın
            </p>
          </div>

          {/* Chat Container */}
          <div className="bg-white dark:bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-trustworthy-blue p-6 flex items-center gap-4">
              <ChatSectionLogo />
              <div>
                <h3 className="text-white font-bold text-lg">Glob AI</h3>
                <p className="text-white/80 text-sm">Her zaman buradayız 24/7</p>
              </div>
            </div>

            {/* Quick Questions */}
            <div className="bg-gray-50 dark:bg-black/20 p-4 border-b border-gray-200 dark:border-white/10">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium">Hızlı Sorular:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="px-4 py-2 bg-white dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-trustworthy-blue hover:text-white transition-all border border-gray-200 dark:border-white/10"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-black/10">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl p-4 ${
                      message.sender === 'user'
                        ? 'bg-trustworthy-blue text-white'
                        : 'bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white'
                    }`}
                  >
                    <ChatMessageContent
                      text={message.text}
                      allowMarkdown={message.sender === 'bot'}
                    />
                    <p
                      className={`text-xs mt-2 ${
                        message.sender === 'user'
                          ? 'text-white/70'
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
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-2xl p-4 text-gray-800 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 bg-trustworthy-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-trustworthy-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-trustworthy-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">AI cevap veriyor, lütfen bekleyin...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white dark:bg-black/20 border-t border-gray-200 dark:border-white/10">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Mesajınızı yazın..."
                  className="flex-1 px-6 py-4 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-trustworthy-blue text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={isTyping}
                  className="px-8 py-4 bg-trustworthy-blue rounded-full flex items-center justify-center hover:bg-blue-700 transition-all gap-2 font-semibold text-white disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  Gönder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

