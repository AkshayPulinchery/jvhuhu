'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, Sparkles, User, KeyRound, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';
import { useEmails, BlockchainEmail, shortenAddress, formatTimestamp } from '@/context/EmailContext';

interface EmailDetailProps {
  selectedId: number | null;
}

export function BlockchainEmailDetail({ selectedId }: EmailDetailProps) {
  const { emails, loading } = useEmails();
  const { address } = useAccount();
  const [summary, setSummary] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const email: BlockchainEmail | undefined = emails.find((e: BlockchainEmail) => e.id === selectedId);
  const isSentByMe = email?.from.toLowerCase() === address?.toLowerCase();

  if (!address) {
    return (
      <div className="flex-1 h-full bg-[var(--color-retro-bg)] flex items-center justify-center p-8">
        <div className="text-2xl font-black text-gray-400 border-[4px] border-dashed border-gray-300 p-12 text-center uppercase">
          Connect wallet to read emails
        </div>
      </div>
    );
  }

  if (!selectedId) {
    return (
      <div className="flex-1 h-full bg-[var(--color-retro-bg)] flex items-center justify-center p-8">
        <div className="text-2xl font-black text-gray-400 border-[4px] border-dashed border-gray-300 p-12 text-center uppercase">
          Select a quantum-secured message
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 h-full bg-[var(--color-retro-bg)] flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!email) {
    return (
      <div className="flex-1 h-full bg-[var(--color-retro-bg)] flex items-center justify-center p-8">
        <div className="text-2xl font-black text-gray-400 border-[4px] border-dashed border-gray-300 p-12 text-center uppercase">
          Email not found
        </div>
      </div>
    );
  }

  const handleSummarize = () => {
    setIsGenerating(true);
    setSummary(null);
    setTimeout(() => {
      const wordCount = email.body.split(/\s+/).length;
      const preview = email.body.substring(0, 100);
      setSummary(`TL;DR (${wordCount} words): ${preview}... This is a blockchain-encrypted message from ${shortenAddress(email.from)}.`);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex-1 h-full bg-[var(--color-retro-white)] flex flex-col overflow-auto">
      <div className="bg-[var(--color-retro-green)] border-b-[4px] border-black p-3 flex items-center gap-3">
        <KeyRound strokeWidth={3} size={24} />
        <span className="font-black uppercase text-sm tracking-wide">
          Quantum Encrypted (FHE) - Only you can decrypt
        </span>
      </div>

      <div className="p-8 flex flex-col gap-6 max-w-4xl mx-auto w-full">
        <div className="flex justify-between items-start">
          <h1 className="text-4xl font-black uppercase tracking-tight">{email.subject}</h1>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 border-[3px] border-black shadow-[4px_4px_0_0_black]">
          <div className="w-12 h-12 bg-gray-200 border-[2px] border-black flex items-center justify-center overflow-hidden">
            <User size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-black">
              {isSentByMe ? `To: ${shortenAddress(email.to)}` : `From: ${shortenAddress(email.from)}`}
            </span>
            <span className="font-bold text-gray-500 text-sm">
              {isSentByMe ? 'Sent' : 'Received'} • {formatTimestamp(email.timestamp)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <button 
            onClick={handleSummarize}
            disabled={isGenerating}
            className="bg-[var(--color-retro-pink)] px-4 py-2 font-black uppercase flex items-center gap-2 border-[3px] border-black shadow-[4px_4px_0_0_black] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all disabled:opacity-50"
          >
            <Sparkles size={20} /> Summarize
          </button>
        </div>

        {isGenerating && (
           <div className="font-bold text-gray-500 animate-pulse flex items-center gap-2">
             <Loader2 className="w-4 h-4 animate-spin" /> Running quantum summary...
           </div>
        )}

        {summary && (
          <div className="bg-[var(--color-retro-bg)] p-4 border-[3px] border-black shadow-[4px_4px_0_0_black] font-bold">
            <div className="flex items-center gap-2 mb-2 font-black uppercase text-[var(--color-retro-pink)] drop-shadow-[1px_1px_0_black]">
              <Sparkles size={18} /> TL;DR
            </div>
            {summary}
          </div>
        )}

        <div className="mt-8 font-mono text-lg leading-relaxed whitespace-pre-wrap flex-1">
          {email.body}
        </div>

        <div className="mt-auto border-t-[4px] border-black pt-8 flex justify-center pb-8">
          <div className="bg-gray-100 p-4 border-[3px] border-black font-bold text-sm text-center">
            <p>This message is stored on Ethereum Sepolia • ID: {email.id}</p>
            <p className="text-gray-500">FHE Encrypted - Zero Knowledge Proof</p>
          </div>
        </div>
      </div>
    </div>
  );
}