'use client';

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Mail, Wifi, WifiOff, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { brutalBorder, brutalShadowNoHover } from '@/lib/utils';
import { cn } from '@/lib/utils';

function getDemoMode(): boolean {
  if (typeof window === 'undefined') return true;
  const saved = localStorage.getItem('demoMode');
  return saved !== 'false';
}

function getUserId(): string {
  const saved = localStorage.getItem('userId');
  if (saved) return saved;
  const newId = 'user_' + Math.random().toString(36).substr(2, 9);
  localStorage.setItem('userId', newId);
  return newId;
}

export function Navbar() {
  const [demoMode, setDemoMode] = useState(true);
  const [userId, setUserId] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setDemoMode(getDemoMode());
    setUserId(getUserId());
  }, []);

  const toggleMode = () => {
    const newMode = !demoMode;
    setDemoMode(newMode);
    localStorage.setItem('demoMode', String(newMode));
  };

  const copyId = () => {
    navigator.clipboard.writeText(userId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <nav className={cn(
      "flex items-center justify-between p-4 bg-[var(--color-retro-white)]",
      "border-b-[4px] border-black"
    )}>
      <Link href="/" className="flex items-center gap-2 group">
        <div className={cn(
          "w-10 h-10 bg-[var(--color-retro-yellow)] flex justify-center items-center",
          brutalBorder,
          brutalShadowNoHover,
          "group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all"
        )}>
          <Mail className="font-black text-black" strokeWidth={3} />
        </div>
        <span className="text-2xl font-black tracking-tight uppercase ml-2">
          CuteMail
        </span>
      </Link>

      <div className="flex items-center gap-4">
        <button
          onClick={copyId}
          className="flex items-center gap-2 px-3 py-2 border-[3px] border-black font-bold text-sm bg-white hover:bg-gray-100"
          title="Click to copy your ID"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          ID: {userId}
        </button>
        
        <button
          onClick={toggleMode}
          className={cn(
            "flex items-center gap-2 px-3 py-2 border-[3px] border-black font-bold text-sm",
            demoMode 
              ? "bg-[var(--color-retro-green)] hover:bg-green-500" 
              : "bg-[var(--color-retro-pink)] hover:bg-pink-500"
          )}
        >
          {demoMode ? <Wifi size={16} /> : <WifiOff size={16} />}
          {demoMode ? 'DEMO' : 'CHAIN'}
        </button>
        <div className={cn(brutalBorder, brutalShadowNoHover, "bg-[var(--color-retro-blue)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none")}>
          <ConnectButton showBalance={false} chainStatus="none" accountStatus="avatar" />
        </div>
      </div>
    </nav>
  );
}
