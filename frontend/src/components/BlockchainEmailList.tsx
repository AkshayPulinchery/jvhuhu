'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { cn } from '@/lib/utils';
import { AlertTriangle, ShieldCheck, Loader2, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEmails, shortenAddress, formatTimestamp, BlockchainEmail } from '@/context/EmailContext';

interface EmailListProps {
  selectedId: number | null;
  setSelectedId: (id: number) => void;
  folder?: string;
}

export function BlockchainEmailList({ selectedId, setSelectedId, folder = 'inbox' }: EmailListProps) {
  const { emails, loading, error, refresh, initialized, importEmail } = useEmails();
  const { isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<'All' | 'Sent'>('All');
  const [showImport, setShowImport] = useState(false);
  const [importCode, setImportCode] = useState('');

  const filteredEmails = emails.filter((email: BlockchainEmail) => {
    if (folder === 'inbox') {
      return activeTab === 'Sent' 
        ? email.to.toLowerCase() === email.from.toLowerCase() 
        : email.to.toLowerCase() !== email.from.toLowerCase();
    }
    if (folder === 'sent') {
      return email.to.toLowerCase() === email.from.toLowerCase();
    }
    return true;
  });

  if (!isConnected) {
    return (
      <div className="flex flex-col h-full border-r-[4px] border-black bg-white">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <p className="font-black text-lg mb-2">Connect Wallet</p>
            <p className="text-sm text-gray-500">to access your quantum-secured emails</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading && !initialized) {
    return (
      <div className="flex flex-col h-full border-r-[4px] border-black bg-white">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
            <p className="font-black text-sm">Loading quantum emails...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full border-r-[4px] border-black bg-white">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="font-black text-sm text-red-500">{error}</p>
            <button 
              onClick={refresh}
              className="mt-2 px-4 py-2 border-[3px] border-black bg-yellow-400 font-bold text-sm hover:bg-yellow-500"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full border-r-[4px] border-black bg-white">
      <div className="flex border-b-[4px] border-black font-black uppercase text-sm">
        <button 
          onClick={() => setShowImport(!showImport)}
          className="p-2 border-r-[4px] border-black hover:bg-green-400 transition-colors"
          title="Import email code"
        >
          <Download size={16} />
        </button>
        {['All', 'Sent'].map((tab) => (
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

      {showImport && (
        <div className="p-2 border-b-[4px] border-black bg-gray-100">
          <input
            type="text"
            placeholder="Paste email code here..."
            value={importCode}
            onChange={(e) => setImportCode(e.target.value)}
            className="w-full p-2 border-[2px] border-black text-xs font-mono"
          />
          <button
            onClick={() => { importEmail(importCode); setImportCode(''); setShowImport(false); }}
            className="mt-2 w-full bg-green-500 text-white font-bold py-2 border-[2px] border-black"
          >
            Import
          </button>
        </div>
      )}

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="overflow-y-auto flex-1 p-2 flex flex-col gap-2 bg-[var(--color-retro-bg)]"
      >
        {filteredEmails.map((email: BlockchainEmail, idx: number) => (
          <motion.button
            key={email.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
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
                <ShieldCheck size={14} className="text-green-600" />
                {folder === 'sent' ? `To: ${shortenAddress(email.to)}` : `From: ${shortenAddress(email.from)}`}
              </span>
              <span className="text-xs font-bold text-gray-500">
                {formatTimestamp(email.timestamp)}
              </span>
            </div>
            <h4 className="font-bold text-base truncate pr-2">{email.subject}</h4>
            <p className="text-sm text-gray-600 truncate">{email.body.substring(0, 50)}...</p>
          </motion.button>
        ))}

        {filteredEmails.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="p-8 text-center font-bold text-gray-500"
          >
            No emails yet. Send one to get started!
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}