'use client';

import { useState } from 'react';
import { EmailList } from '@/components/EmailList';
import { EmailDetail } from '@/components/EmailDetail';

export default function SentPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="flex h-full w-full">
      <div className="w-[400px] flex-shrink-0 h-full">
        {/* We can pass a folder="sent" prop later, but to avoid 404s we just render the list */}
        <EmailList selectedId={selectedId} setSelectedId={setSelectedId} folder="sent" />
      </div>
      <div className="flex-1 h-full min-w-0">
        <EmailDetail selectedId={selectedId} />
      </div>
    </div>
  );
}
