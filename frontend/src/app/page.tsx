'use client';

import { Navbar } from '@/components/Navbar';
import { brutalBorder, brutalShadow } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Mail, Cpu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingScreen } from '@/components/LoadingScreen';

export default function Home() {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1, rotate: -2 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          whileHover={{ scale: 1.05, rotate: 0 }}
          className="text-6xl md:text-8xl font-black uppercase mb-6 tracking-tighter leading-none bg-[var(--color-retro-yellow)] inline-block p-4 border-[6px] border-black shadow-[8px_8px_0_0_black]"
        >
          HACK THE MAILS
        </motion.h1>
        
        <motion.p 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl text-xl md:text-2xl font-bold mb-12 bg-white/80 p-4 border-[3px] border-black shadow-[4px_4px_0_0_black]"
        >
          Post-Quantum Secure. Zero-Knowledge. <br/> Neo-Brutalist Experience.
        </motion.p>

        {mounted ? (
          isConnected ? (
            <Link 
              href="/dashboard"
              className={cn(
                "inline-flex items-center gap-3 text-2xl font-black uppercase px-8 py-4 bg-[var(--color-retro-pink)] text-black",
                brutalBorder,
                brutalShadow
              )}
            >
              Launch Dashboard <ArrowRight strokeWidth={4} />
            </Link>
          ) : (
            <div className={cn(
              "inline-flex flex-col items-center gap-3 text-xl font-bold px-8 py-6 bg-[var(--color-retro-blue)] text-black",
              brutalBorder,
              brutalShadow
            )}>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={32} />
                <span className="uppercase text-2xl">Connect to begin</span>
              </div>
              <p className="text-sm font-mono max-w-sm">
                Authenticate securely using your Web3 wallet. Your keys never leave your device.
              </p>
            </div>
          )
        ) : (
          <div className="h-20 w-64 animate-pulse bg-gray-300 border-4 border-black" />
        )}

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-6xl w-full text-left">
          <FeatureCard 
            color="bg-[var(--color-retro-yellow)]"
            icon={<ShieldCheck size={40}/>}
            title="Shatterproof"
            desc="Encrypted with CRYSTALS-Kyber logic. Safe against quantum algorithms."
          />
          <FeatureCard 
            color="bg-[var(--color-retro-green)]"
            icon={<Mail size={40}/>}
            title="Zero Knowledge"
            desc="Your inbox is only yours. We literally can't read your emails."
          />
          <FeatureCard 
            color="bg-[var(--color-retro-pink)]"
            icon={<Cpu size={40}/>}
            title="AI Enhanced"
            desc="Write with AI. Read with AI. Filter spam with AI."
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ color, icon, title, desc }: { color: string, icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={cn(
        "p-6 border-[4px] border-black shadow-[6px_6px_0_0_black] flex flex-col gap-4 transition-colors",
        color
      )}
    >
      <motion.div 
        className="p-3 bg-white border-[3px] border-black shadow-[4px_4px_0_0_black] inline-flex w-fit"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-2xl font-black uppercase">{title}</h3>
      <p className="font-bold">{desc}</p>
    </motion.div>
  );
}
