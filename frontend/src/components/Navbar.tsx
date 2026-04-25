'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { brutalBorder, brutalShadowNoHover } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function Navbar() {
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
        {/* We can customize the ConnectButton slightly via pseudo elements or wrappers but RainbowKit handles it generally. */}
        <div className={cn(brutalBorder, brutalShadowNoHover, "bg-[var(--color-retro-blue)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none")}>
          <ConnectButton showBalance={false} chainStatus="none" accountStatus="avatar" />
        </div>
      </div>
    </nav>
  );
}
