'use client';

import { Navbar } from '@/components/Navbar';
import { brutalBorder, brutalShadow } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Mail, Cpu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function FeatureCard({ color, icon, title, desc, index }: { color: string, icon: React.ReactNode, title: string, desc: string, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index }}
      className={cn(
        "p-6 border-[4px] border-black shadow-[6px_6px_0_0_black] flex flex-col gap-4",
        color
      )}
    >
      <div className="p-3 bg-white border-[3px] border-black shadow-[4px_4px_0_0_black] inline-flex w-fit">
        {icon}
      </div>
      <h3 className="text-2xl font-black uppercase tracking-tight">{title}</h3>
      <p className="font-bold text-black/80">{desc}</p>
    </motion.div>
  );
}

export default function Home() {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <Navbar />
      
      {mounted && (
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center relative z-10">
          <div className="max-w-6xl w-full flex flex-col items-center">
            <motion.h1 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-6xl md:text-8xl font-black uppercase mb-6 tracking-tighter leading-none bg-[var(--color-retro-yellow)] inline-block p-4 border-[6px] border-black shadow-[8px_8px_0_0_black]"
            >
              CUTE MAIL
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl text-xl md:text-2xl font-bold mb-12 bg-white p-4 border-[3px] border-black shadow-[4px_4px_0_0_black]"
            >
              Post-Quantum Secure. Zero-Knowledge. <br/> Neo-Brutalist Experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link 
                href="/dashboard"
                className={cn(
                  "inline-flex items-center gap-3 text-2xl font-black uppercase px-8 py-4 text-black bg-[var(--color-retro-blue)] transition-all",
                  brutalBorder,
                  brutalShadow,
                  "hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                )}
              >
                Go to Dashboard
                <ArrowRight strokeWidth={4} />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full text-left">
              <FeatureCard 
                index={0}
                color="bg-[var(--color-retro-yellow)]"
                icon={<ShieldCheck size={40}/>}
                title="Secure"
                desc="Quantum resistant logic. Safe against the future."
              />
              <FeatureCard 
                index={1}
                color="bg-[var(--color-retro-green)]"
                icon={<Mail size={40}/>}
                title="Private"
                desc="Truly zero-knowledge. Your data is your own."
              />
              <FeatureCard 
                index={2}
                color="bg-[var(--color-retro-pink)]"
                icon={<Cpu size={40}/>}
                title="AI Powered"
                desc="Smart assistance for your daily workflow."
              />
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
