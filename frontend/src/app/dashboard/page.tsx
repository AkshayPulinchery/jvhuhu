'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { BlockchainEmailList } from '@/components/BlockchainEmailList';
import { BlockchainEmailDetail } from '@/components/BlockchainEmailDetail';
import { EmailList } from '@/components/EmailList';
import { EmailDetail } from '@/components/EmailDetail';

export default function DashboardPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { isConnected } = useAccount();

  return (
    <div className="flex h-full w-full">
      <div className="w-[400px] flex-shrink-0 h-full">
        {isConnected ? (
          <BlockchainEmailList selectedId={selectedId} setSelectedId={setSelectedId} />
        ) : (
          <EmailList selectedId={selectedId} setSelectedId={setSelectedId} />
        )}
      </div>
      <div className="flex-1 h-full min-w-0">
        {isConnected ? (
          <BlockchainEmailDetail selectedId={selectedId} />
        ) : (
          <EmailDetail selectedId={selectedId} />
        )}
      </div>
    </div>
  );
}