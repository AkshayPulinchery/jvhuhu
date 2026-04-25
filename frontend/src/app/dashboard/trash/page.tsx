'use client';

import { useState } from 'react';
import { EmailList } from '@/components/EmailList';
import { EmailDetail } from '@/components/EmailDetail';

export default function TrashPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="flex h-full w-full">
      <div className="w-[400px] flex-shrink-0 h-full">
        <EmailList selectedId={selectedId} setSelectedId={setSelectedId} folder="trash" />
      </div>
      <div className="flex-1 h-full min-w-0">
        <EmailDetail selectedId={selectedId} />
      </div>
    </div>
  );
}
