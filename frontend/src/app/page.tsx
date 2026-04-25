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
    <div 
      className={cn(
        "p-6 border-[4px] border-black shadow-[6px_6px_0_0_black] flex flex-col gap-4 bg-white",
        color
      )}
    >
      <div className="p-3 bg-white border-[3px] border-black shadow-[4px_4px_0_0_black] inline-flex w-fit">
        {icon}
      </div>
      <h3 className="text-2xl font-black uppercase tracking-tight text-black">{title}</h3>
      <p className="font-bold text-black">{desc}</p>
    </div>
  );
}

export default function Home() {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      setMounted(true);
      console.log("Home component mounted");
    } catch (e) {
      console.error("Mount error:", e);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#ecece0] flex items-center justify-center font-mono font-bold">
        <div className="border-4 border-black p-4 bg-white shadow-[8px_8px_0_0_black]">
          INITIALIZING_QUANTUM_CORE...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-[#ecece0]">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center relative z-10">
        <div className="max-w-6xl w-full flex flex-col items-center">
          <h1 className="text-6xl md:text-8xl font-black uppercase mb-6 tracking-tighter leading-none bg-[#facc15] inline-block p-4 border-[6px] border-black shadow-[8px_8px_0_0_black] text-black">
            CUTE MAIL
          </h1>
          
          <p className="max-w-2xl text-xl md:text-2xl font-bold mb-12 bg-white p-4 border-[3px] border-black shadow-[4px_4px_0_0_black] text-black">
            Post-Quantum Secure. Zero-Knowledge. <br/> Neo-Brutalist Experience.
          </p>

          <div>
            <Link 
              href="/dashboard"
              className={cn(
                "inline-flex items-center gap-3 text-2xl font-black uppercase px-8 py-4 text-black bg-[#60a5fa] transition-all",
                "border-[4px] border-black shadow-[6px_6px_0_0_black]",
                "hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              )}
            >
              Go to Dashboard
              <ArrowRight strokeWidth={4} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full text-left">
            <FeatureCard 
              index={0}
              color="bg-[#facc15]"
              icon={<ShieldCheck size={40} color="black" />}
              title="Secure"
              desc="Quantum resistant logic. Safe against the future."
            />
            <FeatureCard 
              index={1}
              color="bg-[#4ade80]"
              icon={<Mail size={40} color="black" />}
              title="Private"
              desc="Truly zero-knowledge. Your data is your own."
            />
            <FeatureCard 
              index={2}
              color="bg-[#f472b6]"
              icon={<Cpu size={40} color="black" />}
              title="AI Powered"
              desc="Smart assistance for your daily workflow."
            />
          </div>
        </div>
      </main>

      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-black rotate-12 bg-[#facc15]" />
        <div className="absolute bottom-20 right-20 w-48 h-48 border-4 border-black -rotate-12 bg-[#60a5fa]" />
      </div>
    </div>
  );
}
