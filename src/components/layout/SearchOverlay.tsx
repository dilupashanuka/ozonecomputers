"use client"

import { useState, useEffect, useRef } from "react";
import { Search, X, TrendingUp, Sparkles, Monitor, Smartphone, Cpu, Zap } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function SearchOverlay({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const TRENDING = [
    { label: "Elite Workstations", icon: Monitor },
    { label: "Flagship Mobile", icon: Smartphone },
    { label: "GPU Overclocking", icon: Zap },
    { label: "Gen 5 Components", icon: Cpu },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-none w-full h-full p-0 m-0 bg-black/95 backdrop-blur-3xl border-none flex flex-col items-center pt-40 overflow-y-auto custom-scrollbar">
        {/* Animated Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
           <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full" />
           <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full" />
        </div>

        <button 
          onClick={onClose}
          className="absolute top-10 right-10 w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all duration-500 group shadow-2xl"
        >
          <X className="w-10 h-10 group-hover:rotate-90 transition-transform" />
        </button>

        <div className="w-full max-w-6xl px-6 space-y-20 relative z-10">
          <div className="relative group">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 text-slate-800 group-focus-within:text-primary transition-all duration-500 group-focus-within:scale-110" />
            <input 
              ref={inputRef}
              type="text"
              placeholder="ENTER SEARCH QUERY..."
              className="w-full bg-transparent border-b-8 border-white/5 py-12 pl-24 pr-12 text-5xl md:text-8xl font-black text-white placeholder:text-slate-900 focus:outline-none focus:border-primary transition-all uppercase tracking-tighter italic"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 pb-20">
            <div className="space-y-10">
              <div className="flex items-center gap-4 text-primary uppercase tracking-[0.5em] text-xs font-black italic">
                <TrendingUp className="w-5 h-5 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                ELITE TRENDS
              </div>
              <div className="grid gap-6">
                {TRENDING.map((item) => (
                  <Link 
                    key={item.label}
                    href={`/products?q=${item.label}`}
                    onClick={onClose}
                    className="group flex items-center gap-8 p-8 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-primary/50 transition-all duration-500 hover:translate-x-4"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white transition-all shadow-xl">
                      <item.icon className="w-8 h-8" />
                    </div>
                    <span className="text-3xl font-black text-white tracking-tighter uppercase italic">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <div className="flex items-center gap-4 text-primary uppercase tracking-[0.5em] text-xs font-black italic">
                <Sparkles className="w-5 h-5 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                LAB SEGMENTS
              </div>
              <div className="grid grid-cols-2 gap-6">
                {["Laptops", "Desktops", "Components", "Monitors", "Phones", "Accessories"].map((cat) => (
                  <Link 
                    key={cat}
                    href={`/products?category=${cat.toLowerCase()}`}
                    onClick={onClose}
                    className="p-10 rounded-[2.5rem] glass border-white/5 hover:border-primary text-center group transition-all duration-500 hover:-translate-y-2"
                  >
                    <span className="text-sm font-black text-slate-500 group-hover:text-white transition-colors uppercase tracking-[0.3em] italic">{cat}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
