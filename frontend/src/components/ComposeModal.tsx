'use client';

import { useState } from 'react';
import { X, Sparkles, Send, RefreshCcw } from 'lucide-react';
import { brutalBorder, brutalShadowNoHover, cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function ComposeModal({ onClose }: { onClose: () => void }) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [tone, setTone] = useState('Professional');
  
  const [isGenerating, setIsGenerating] = useState(false);

  const handleWriteWithAI = () => {
    setIsGenerating(true);
    // Mocking AI Generation Delay
    setTimeout(() => {
      setBody(`Dear ${to || 'Recipient'},\n\nI hope this email finds you well.\n\n[AI Generated Content for: ${subject || 'General inquiry'}]\n\nBest regards,\nCuteMail User`);
      setIsGenerating(false);
    }, 1500);
  };

  const handleRewriteTone = () => {
    if (!body) return;
    setIsGenerating(true);
    setTimeout(() => {
      setBody(`[${tone} Rewrite]: \n${body}`);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 sm:p-8 overflow-hidden backdrop-blur-sm">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className={cn(
          "w-full max-w-2xl max-h-[90vh] bg-[var(--color-retro-white)] flex flex-col",
          brutalBorder,
          brutalShadowNoHover
        )}
      >
        {/* Header */}
        <div className="bg-[var(--color-retro-yellow)] p-3 border-b-[4px] border-black flex justify-between items-center text-black">
          <h2 className="font-black uppercase text-xl">New Message</h2>
          <button onClick={onClose} className="hover:bg-black hover:text-white p-1 border-[2px] border-transparent hover:border-black transition-colors">
            <X strokeWidth={3} />
          </button>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col flex-1 p-4 gap-4 overflow-y-auto">
          <div className="flex items-center gap-2 border-b-[3px] border-black pb-2">
            <span className="font-bold text-gray-500 w-16">To:</span>
            <input 
              className="flex-1 outline-none font-medium bg-transparent"
              placeholder="0xWalletAddress or Username" 
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 border-b-[3px] border-black pb-2">
            <span className="font-bold text-gray-500 w-16">Subject:</span>
            <input 
              className="flex-1 outline-none font-bold bg-transparent placeholder-gray-300"
              placeholder="Post-Quantum Secure Inquiry" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          {/* AI Tools Bar */}
          <div className="flex flex-wrap gap-3 mt-2">
            <button 
              onClick={handleWriteWithAI}
              disabled={isGenerating}
              className="bg-[var(--color-retro-pink)] px-3 py-2 font-bold flex items-center gap-2 border-[2px] border-black shadow-[2px_2px_0_0_black] active:translate-x-1 active:translate-y-1 active:shadow-none min-w-fit"
            >
              <Sparkles size={18} /> Write with AI
            </button>
            <div className="flex items-center gap-2 border-[2px] border-black shadow-[2px_2px_0_0_black] bg-white p-1">
              <select 
                className="outline-none font-bold bg-transparent pl-2"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                <option>Professional</option>
                <option>Casual</option>
                <option>Urgent</option>
                <option>Poetic</option>
              </select>
              <button 
                onClick={handleRewriteTone}
                disabled={isGenerating || !body}
                className="bg-[var(--color-retro-blue)] px-2 py-1 flex items-center gap-1 border-l-[2px] border-black font-bold active:bg-blue-600 disabled:opacity-50"
              >
                <RefreshCcw size={16} /> Rewrite
              </button>
            </div>
          </div>

          <textarea 
            className="flex-1 w-full mt-4 p-4 min-h-[250px] outline-none border-[3px] border-black shadow-[inset_4px_4px_0_0_rgba(0,0,0,0.1)] resize-none font-mono text-sm leading-relaxed"
            placeholder="Write your securely encrypted message here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <AnimatePresence>
            {isGenerating && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10 font-bold"
              >
                Generating AI Magic...
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 border-t-[4px] border-black bg-gray-100 flex justify-between items-center">
          <p className="text-sm font-bold text-gray-500">
            🔒 End-to-End Encrypted (KYBER-1024)
          </p>
          <button 
            className="bg-[var(--color-retro-green)] px-6 py-3 font-black uppercase flex items-center gap-2 border-[3px] border-black shadow-[4px_4px_0_0_black] active:translate-x-1 active:translate-y-1 active:shadow-none"
            onClick={() => {
              alert("Message encrypted and sent via mock API!");
              onClose();
            }}
          >
            <Send size={20} /> Send
          </button>
        </div>
      </motion.div>
    </div>
  );
}
