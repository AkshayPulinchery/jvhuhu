'use client';

import { cn } from '@/lib/utils';
import { Mail, Clock, Star, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';

// Mock Data
export const MOCK_EMAILS = [
  {
    id: 1,
    sender: 'vitalik@ethereum.org',
    subject: 'Urgent: Hackathon Submission',
    preview: 'Please finalize your PQC models.',
    date: '10:30 AM',
    isImportant: true,
    isSpam: false,
    isDestructive: false,
    content: 'Hi Team,\n\nPlease finalize your PQC models for the hackathon submission. Make sure the Web3 integration is seamless.\n\nBest, Vitalik'
  },
  {
    id: 2,
    sender: 'marketing@randomspam.eth',
    subject: 'Buy NOW! 1000x Token',
    preview: 'Don\'t miss out on this opportunity...',
    date: 'Yesterday',
    isImportant: false,
    isSpam: true,
    isDestructive: false,
    content: 'Buy this token now to increase your web3 portfolio by 1000x! Click the sketchy link below.\n\nhttp://sketchy-link.com'
  },
  {
    id: 3,
    sender: 'alice@cryptolab.io',
    subject: 'Draft review for Zero-Knowledge proofs',
    preview: 'I have attached the initial draft for...',
    date: 'Oct 12',
    isImportant: true,
    isSpam: false,
    isDestructive: false,
    content: 'Hey,\n\nI have attached the initial draft for our paper on advanced ZK rollups. Let me know what you think.\n\nAlice'
  },
  {
    id: 4,
    sender: 'system@cutemail.io',
    subject: '[TOP SECRET] Self-Destructing Data',
    preview: 'Warning: This message will be destroyed...',
    date: 'Now',
    isImportant: true,
    isSpam: false,
    isDestructive: true,
    content: 'TOP SECRET CLASSIFIED DATA:\n\nProject "GHOST-QUANTUM" has been activated. The encryption keys are embedded in this signal. This message will be vaporized immediately after reading.\n\nGOOD LUCK AGENT.'
  }
];

export function EmailList({ selectedId, setSelectedId, folder = 'inbox' }: { selectedId: number | null, setSelectedId: (id: number) => void, folder?: string }) {
  const [activeTab, setActiveTab] = useState<'Important' | 'Others' | 'Spam'>('Important');
  const { destroyedIds } = useUser();

  const emails = MOCK_EMAILS.filter(e => {
    // Hide destroyed emails
    if (destroyedIds.includes(e.id)) return false;

    // If not inbox, just return empty to demonstrate different folder view (for now)
    if (folder !== 'inbox') return false;

    if (activeTab === 'Spam') return e.isSpam;
    if (activeTab === 'Important') return e.isImportant && !e.isSpam;
    return !e.isImportant && !e.isSpam;
  });

  return (
    <div className="flex flex-col h-full border-r-[4px] border-black bg-white">
      {/* Smart Tabs */}
      <div className="flex border-b-[4px] border-black font-black uppercase text-sm">
        {['Important', 'Others', 'Spam'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={cn(
              "flex-1 p-3 border-r-[4px] border-black last:border-r-0 transition-colors",
              activeTab === tab ? "bg-[var(--color-retro-yellow)]" : "hover:bg-gray-100"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="overflow-y-auto flex-1 p-2 flex flex-col gap-2 bg-[var(--color-retro-bg)]"
      >
        {emails.map((email, idx) => (
          <motion.button
            key={email.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedId(email.id)}
            className={cn(
              "text-left p-4 border-[3px] border-black transition-colors flex flex-col gap-1",
              selectedId === email.id ? "bg-[var(--color-retro-blue)] shadow-[4px_4px_0_0_black]" : "bg-white hover:bg-gray-50 shadow-[2px_2px_0_0_black]"
            )}
          >
            <div className="flex justify-between items-center w-full">
              <span className="font-black text-sm truncate flex-1 flex items-center gap-1">
                {email.isSpam ? <AlertTriangle size={14} className="text-red-500" /> : <ShieldCheck size={14} className="text-green-600" />}
                {email.sender}
              </span>
              <span className="text-xs font-bold text-gray-500">{email.date}</span>
            </div>
            <h4 className="font-bold text-base truncate pr-2">{email.subject}</h4>
            <p className="text-sm text-gray-600 truncate">{email.preview}</p>
          </motion.button>
        ))}

        {emails.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="p-8 text-center font-bold text-gray-500"
          >
            No emails in {folder === 'inbox' ? 'this category' : folder}.
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
