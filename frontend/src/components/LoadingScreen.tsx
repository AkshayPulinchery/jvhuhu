'use client';

import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[var(--color-retro-bg)] z-[100] flex flex-col items-center justify-center p-8">
      <motion.div 
        animate={{ 
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.2, 1, 1.2, 1]
        }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="w-24 h-24 border-[8px] border-black bg-[var(--color-retro-yellow)] shadow-[8px_8px_0_0_black] flex items-center justify-center"
      >
        <span className="text-4xl font-black">?</span>
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-3xl font-black uppercase tracking-tighter"
      >
        Decrypting Quantum Data...
      </motion.h2>
      
      <div className="w-64 h-6 border-[4px] border-black bg-white mt-4 relative overflow-hidden">
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-[var(--color-retro-pink)]"
        />
      </div>
    </div>
  );
}
