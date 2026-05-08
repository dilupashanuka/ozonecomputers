'use client';

import { useState } from 'react';
import { ChevronRight, HelpCircle, Activity, Terminal, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-[3rem] bg-black/[0.01] border transition-all duration-1000 cursor-pointer group shadow-2xl relative overflow-hidden",
        isOpen 
          ? 'border-primary/60 bg-black/[0.03] shadow-[0_40px_100px_rgba(0,0,0,0.8)]' 
          : 'border-black/5 hover:border-primary/40 hover:bg-black/[0.02]'
      )}
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Decorative Glow */}
      <div className={cn(
        "absolute top-0 left-0 w-32 h-32 bg-primary/5 blur-3xl pointer-events-none transition-opacity duration-1000",
        isOpen ? "opacity-100" : "opacity-0"
      )} />

      <div className="p-10 md:p-14 flex items-center justify-between gap-10 relative z-10">
        <div className="flex items-center gap-8">
           <div className={cn(
             "w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-1000",
             isOpen 
               ? 'bg-primary text-slate-900 shadow-[0_0_30px_rgba(239,68,68,0.6)] scale-110' 
               : 'bg-black/[0.03] border border-black/5 text-slate-800 group-hover:text-primary group-hover:bg-primary/10'
           )}>
              <HelpCircle className="w-8 h-8" />
           </div>
           <h4 className={cn(
             "text-2xl md:text-3xl font-black uppercase tracking-tighter italic transition-all duration-1000 leading-none",
             isOpen ? 'text-primary' : 'text-slate-900'
           )}>
             {question}
           </h4>
        </div>
        <div className={cn(
          "shrink-0 w-16 h-16 rounded-[1.5rem] border-2 flex items-center justify-center transition-all duration-1000",
          isOpen 
            ? 'border-primary bg-primary/20 rotate-90 text-primary shadow-2xl' 
            : 'border-black/5 bg-black/[0.02] group-hover:border-primary/40 text-slate-900 group-hover:text-primary'
        )}>
          <ChevronRight className="w-8 h-8" />
        </div>
      </div>

      {/* Animated answer */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-10",
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-14 pb-14 md:px-20 md:pb-20">
           <div className="flex items-center gap-6 mb-10">
              <div className="h-px flex-1 bg-black/5" />
              <Activity className="w-4 h-4 text-primary animate-pulse" />
              <div className="h-px w-20 bg-black/5" />
           </div>
           <p className="text-slate-600 text-xl md:text-2xl font-black uppercase tracking-tight italic leading-relaxed max-w-4xl">
             {answer}
           </p>
           
           <div className="mt-12 flex items-center gap-4 text-slate-900">
              <Terminal className="w-5 h-5" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] italic">LAB_PROTOCOL_RESOLVED</span>
           </div>
        </div>
      </div>
    </div>
  );
}
