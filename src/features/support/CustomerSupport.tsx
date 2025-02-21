/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { cn } from '../../utils/cn';
import axios from 'axios';
import { trainingData, makeItSoundReal, platformFeatures} from '../../data/training_data';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
}

interface AIResponse {
  content: string;
  status: string;
  id: string;
}

interface AIRequestBody {
  question: string;
  model: string;
  randomness: number;
  response_type: string;
  training_data: string;
  stream_data?: boolean;
}

export function CustomerSupport() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);
      return parsedMessages.map((msg: Message) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    }
    return [];
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);
      setMessages(parsedMessages.map((msg: Message) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const generateResponse = async (userMessage: string) => {
    const requestBody: AIRequestBody = {
      question: userMessage,
      model: 'aicon-v4-nano-160824',
      randomness: 0.5,
      response_type: 'text',
      training_data: `Start with im codingMentor CustomerSupport AI. How can i help you (if any thing out of your scope getting aske or someone asks you your name ).You are a customer support agent for CodingMentor, an interactive learning platform designed to help users master programming. Dont askwer anything outside of the scope of the platform. dont answer anything out of these three points + ${trainingData} + ${makeItSoundReal} + ${platformFeatures}
      
      `,
      stream_data: false
    };

    try {
      const response = await axios.post<AIResponse>(
        import.meta.env.VITE_WORQHAT_API_ENDPOINT,
        requestBody,
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_WORQHAT_API_KEY}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      if (!response.data.content) {
        throw new Error('No content in response');
      }

      return response.data.content;
    } catch (error) {
      console.error('Error generating AI response:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Response error:', error.response.data);
        } else if (error.request) {
          console.error('Request error:', error.request);
        }
      }
      return 'I apologize, but I am having trouble processing your request at the moment. Please try again later.';
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await generateResponse(inputMessage);
      
      setMessages((prev: Message[]): Message[] => {
        const updatedMessages = prev.map(msg =>
          msg.id === userMessage.id ? { ...msg, status: 'sent' } : msg
        );
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          sender: 'ai',
          timestamp: new Date(),
          status: 'sent'
        };

        const newMessages = [...updatedMessages, aiMessage];
        localStorage.setItem('chatMessages', JSON.stringify(newMessages));
        return newMessages as Message[];
      });
    } catch (error) {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === userMessage.id ? { ...msg, status: 'error' } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200 bg-white p-4">
          <h1 className="text-xl font-semibold text-gray-900">Customer Support</h1>
          <p className="text-sm text-gray-600">How can we help you today?</p>
        </div>

        <div className="h-[600px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex items-start gap-2.5 transition-all duration-300',
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                )}
              >
                <div
                  className={cn(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                    message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-100'
                  )}
                >
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-mint" />
                  )}
                </div>
                <div
                  className={cn(
                    'group relative max-w-[75%] rounded-2xl px-3.5 py-2.5',
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <span className="mt-1 block text-[10px] opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                    {message.status === 'sending' && ' • Sending...'}
                    {message.status === 'error' && ' • Failed to send'}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2 text-gray-500">
                <div className="h-2 w-2 animate-bounce rounded-full bg-mint"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-mint" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-mint" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 bg-white p-4">
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 rounded-full border border-gray-200 px-6 py-3 text-base shadow-sm transition-colors focus:border-mint focus:outline-none focus:ring-1 focus:ring-mint"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="rounded-full bg-mint p-3 text-white transition-colors hover:bg-mint/90 disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}