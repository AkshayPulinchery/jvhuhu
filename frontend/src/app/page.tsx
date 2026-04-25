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
    // Simulate a slightly longer load for the vibe, but also ensures everything is ready
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center relative z-10">
        <div className="max-w-6xl w-full flex flex-col items-center">
          <motion.h1 
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: -2 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black uppercase mb-6 tracking-tighter leading-none bg-[var(--color-retro-yellow)] inline-block p-4 border-[6px] border-black shadow-[8px_8px_0_0_black]"
          >
            HACK THE MAILS
          </motion.h1>
          
          <motion.p 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', delay: 0.4 }}
            className="max-w-2xl text-xl md:text-2xl font-bold mb-12 bg-white p-4 border-[3px] border-black shadow-[4px_4px_0_0_black]"
          >
            Post-Quantum Secure. Zero-Knowledge. <br/> Neo-Brutalist Experience.
          </motion.p>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link 
              href="/dashboard"
              className={cn(
                "inline-flex items-center gap-3 text-2xl font-black uppercase px-8 py-4 text-black group transition-all",
                isConnected ? "bg-[var(--color-retro-pink)]" : "bg-[var(--color-retro-blue)]",
                brutalBorder,
                brutalShadow,
                "hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              )}
            >
              {isConnected ? 'Launch Dashboard' : 'Launch Dashboard (DEMO)'} 
              <ArrowRight className="group-hover:translate-x-2 transition-transform" strokeWidth={4} />
            </Link>
          </motion.div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full text-left">
            <FeatureCard 
              index={0}
              color="bg-[var(--color-retro-yellow)]"
              icon={<ShieldCheck size={40}/>}
              title="Shatterproof"
              desc="Encrypted with CRYSTALS-Kyber logic. Safe against quantum algorithms."
            />
            <FeatureCard 
              index={1}
              color="bg-[var(--color-retro-green)]"
              icon={<Mail size={40}/>}
              title="Zero Knowledge"
              desc="Your inbox is only yours. We literally can't read your emails."
            />
            <FeatureCard 
              index={2}
              color="bg-[var(--color-retro-pink)]"
              icon={<Cpu size={40}/>}
              title="AI Enhanced"
              desc="Write with AI. Read with AI. Filter spam with AI."
            />
          </div>
        </div>
      </main>

      {/* Decorative floating elements */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-20 right-[10%] w-16 h-16 bg-[var(--color-retro-pink)] border-4 border-black -z-0 opacity-20 hidden lg:block"
      />
    </div>
  );
}

function FeatureCard({ color, icon, title, desc, index }: { color: string, icon: React.ReactNode, title: string, desc: string, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index }}
      whileHover={{ y: -8, rotate: index % 2 === 0 ? 1 : -1 }}
      className={cn(
        "p-6 border-[4px] border-black shadow-[6px_6px_0_0_black] flex flex-col gap-4 transition-all",
        color
      )}
    >
      <motion.div 
        className="p-3 bg-white border-[3px] border-black shadow-[4px_4px_0_0_black] inline-flex w-fit"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-2xl font-black uppercase tracking-tight">{title}</h3>
      <p className="font-bold text-black/80">{desc}</p>
    </motion.div>
  );
}


