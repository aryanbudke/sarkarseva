import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, X, Bot, User, CornerDownLeft, Loader2, ArrowRight, RefreshCw } from 'lucide-react';
import { ChatMessage } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  setInitialPrompt: (prompt: string | undefined) => void;
}

export default function ChatDrawer({ isOpen, onClose, initialPrompt, setInitialPrompt }: ChatDrawerProps) {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Namaste! I am SarkarSeva's AI Assistant. Ask me anything about citizen e-services, demographic updates, or application document portfolios. I can guide you through municipal and central requirements instantly!"
    }
  ]);
  const [inputVal, setInputVal] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Handle external prompt injection
  React.useEffect(() => {
    if (isOpen && initialPrompt) {
      sendMessage(initialPrompt);
      setInitialPrompt(undefined); // Clear
    }
  }, [isOpen, initialPrompt]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      // API request to server-side endpoint
      const response = await fetch('/api/ask-gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: text,
          history: messages
        })
      });

      const data = await response.json();

      setMessages(prev => [...prev, {
        role: 'model',
        text: data.text || 'Sorry, I couldn\'t process that message. Can I help with standard queries?'
      }]);

    } catch (err: any) {
      setMessages(prev => [...prev, {
        role: 'model',
        text: 'I ran into an issue communicating with the server. Please verify your GEMINI_API_KEY is active.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputVal);
  };

  const samplePrompts = [
    'What documents act as Proof of Address (PoA)?',
    'How long does a child Learner Driving License stand valid?',
    'What cash benefit does Direct PM Matru Vandana provide?'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/60 z-50 backdrop-blur-xs cursor-pointer"
          />

          {/* Right Slide-over drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-background shadow-2xl z-50 flex flex-col border-l border-surface-variant"
          >
            {/* Header */}
            <div className="bg-primary text-white p-5 flex items-center justify-between border-b-4 border-secondary-container">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-secondary-container rounded-full">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold">Ask AI Assistant</h3>
                  <p className="text-[10px] text-white/70 font-sans tracking-wide">e-Governance Expert Model</p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Stream */}
            <div className="flex-grow overflow-y-auto p-5 space-y-4 no-scrollbar">
              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={idx}
                    className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
                  >
                    {/* Icon */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-xs ${
                      isUser ? 'bg-secondary-container text-white' : 'bg-primary text-white'
                    }`}>
                      {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    {/* Chat Bubble */}
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      isUser 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-white text-on-surface border border-surface-container-high rounded-tl-none shadow-sm'
                    }`}>
                      {isUser ? (
                        msg.text.split('\n').map((line, lIdx) => (
                          <p key={lIdx} className={lIdx > 0 ? 'mt-1' : ''}>{line}</p>
                        ))
                      ) : (
                        <div className="text-[13px] sm:text-sm">
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                              h1: ({node, ...props}) => <h1 className="text-base font-bold mt-4 mb-2 text-primary" {...props} />,
                              h2: ({node, ...props}) => <h2 className="text-[15px] font-bold mt-3 mb-2 text-primary" {...props} />,
                              h3: ({node, ...props}) => <h3 className="text-sm font-bold mt-3 mb-1 text-primary" {...props} />,
                              ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 space-y-1" {...props} />,
                              ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 space-y-1" {...props} />,
                              li: ({node, ...props}) => <li className="mb-0.5" {...props} />,
                              strong: ({node, ...props}) => <strong className="font-bold text-[#FF6B00]" {...props} />,
                              a: ({node, ...props}) => <a className="text-[#1657B5] underline hover:text-[#FF6B00] transition-colors" {...props} />
                            }}
                          >
                            {msg.text}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {isLoading && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-surface-container-high shadow-xs rounded-tl-none text-outline text-xs font-sans italic flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-secondary-container" />
                    Consulting India regulations database...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Helper Prompts (only shown if simple history is present) */}
            {messages.length <= 1 && (
              <div className="px-5 py-3 bg-surface-container-low border-t border-surface-variant flex flex-col gap-2">
                <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider font-sans">
                  Suggested inquiries:
                </p>
                <div className="flex flex-col gap-2 font-sans text-xs">
                  {samplePrompts.map((promptText) => (
                    <button
                      key={promptText}
                      onClick={() => sendMessage(promptText)}
                      className="w-full text-left bg-white hover:bg-[#FFF3E8] hover:text-secondary group p-2.5 rounded-lg border border-outline-variant duration-150 flex items-center justify-between cursor-pointer"
                    >
                      <span className="line-clamp-1">{promptText}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-secondary" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form Footer */}
            <form onSubmit={handleFormSubmit} className="p-4 bg-white border-t border-surface-variant/60 flex items-center gap-2">
              <input
                type="text"
                className="flex-grow px-4 py-3 bg-surface border border-[#FFD4B0] focus:border-secondary focus:ring-1 focus:ring-secondary rounded-xl text-sm outline-none"
                placeholder="Type your civic question to AI..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                disabled={isLoading}
              />
              <button 
                type="submit"
                disabled={!inputVal.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-secondary-container hover:bg-secondary text-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
