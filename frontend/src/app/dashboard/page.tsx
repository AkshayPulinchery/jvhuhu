'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { BlockchainEmailList } from '@/components/BlockchainEmailList';
import { BlockchainEmailDetail } from '@/components/BlockchainEmailDetail';
import { EmailList } from '@/components/EmailList';
import { EmailDetail } from '@/components/EmailDetail';

function getDemoMode(): boolean {
  if (typeof window === 'undefined') return true;
  const saved = localStorage.getItem('demoMode');
  return saved !== 'false';
}

export default function DashboardPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[var(--color-retro-bg)]">
        <div className="text-2xl font-black">Loading...</div>
      </div>
    );
  }

  const isDemo = getDemoMode();

  return (
    <div className="flex h-full w-full">
      <div className="w-[400px] flex-shrink-0 h-full">
        {(isConnected || isDemo) ? (
          <BlockchainEmailList selectedId={selectedId} setSelectedId={setSelectedId} />
        ) : (
          <EmailList selectedId={selectedId} setSelectedId={setSelectedId} />
        )}
      </div>
      <div className="flex-1 h-full min-w-0">
        {(isConnected || isDemo) ? (
          <BlockchainEmailDetail selectedId={selectedId} />
        ) : (
          <EmailDetail selectedId={selectedId} />
        )}
      </div>
    </div>
  );
}