"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles, Zap, Activity, ShieldAlert, Terminal } from "lucide-react";

interface InventorySlide {
  id: string;
  image_url: string;
  title: string;
  subtitle: string;
}

interface InventoryHeaderProps {
  slides: any[];
  settings?: {
    inventory_title?: string;
    inventory_subtitle?: string;
  };
}

export function InventoryHeader({ slides, settings }: InventoryHeaderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!slides || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides]);

  const displayTitle = settings?.inventory_title || "LAB INVENTORY ACCESS";
  const displaySubtitle = settings?.inventory_subtitle || "EVERY MODULE IS HAND-PICKED, LAB-TESTED, AND OPTIMIZED FOR MAXIMUM PERFORMANCE OUTPUT. EXPERIENCE THE ELITE STANDARD OF OZONE LABS.";

  if (!slides || slides.length === 0) {
    return (
      <div className="pt-64 pb-32 relative overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/5 blur-[200px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="inline-flex items-center gap-6 rounded-full border border-primary/20 bg-primary/5 px-10 py-4 backdrop-blur-3xl shadow-[0_20px_50px_rgba(239,68,68,0.2)]">
              <Zap className="w-6 h-6 text-primary animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-[0.6em] text-primary italic leading-none">OZONE CORE SYSTEMS</span>
            </div>
            <h1 className="text-[5rem] md:text-[10rem] font-black text-slate-900 tracking-tighter leading-[0.8] uppercase italic drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
              {displayTitle}
            </h1>
            <p className="text-xl md:text-3xl text-slate-500 font-black max-w-4xl mx-auto leading-relaxed italic uppercase tracking-tight">
              {displaySubtitle}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const activeSlide = slides[currentSlide];

  return (
    <div className="relative w-full overflow-hidden bg-slate-50">
      <div className="pt-64 pb-24 relative z-20 text-center">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-14">
            <div className="inline-flex items-center gap-6 rounded-full border border-primary/30 bg-primary/10 px-12 py-5 backdrop-blur-3xl shadow-[0_0_80px_rgba(239,68,68,0.3)] animate-in fade-in slide-in-from-top-12 duration-1000">
              <Activity className="w-6 h-6 text-primary animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-[0.6em] text-primary italic leading-none">OZONE LAB ARCHIVE SCAN</span>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              <h1 className="text-[5rem] md:text-[11rem] font-black text-slate-900 tracking-tighter leading-[0.8] uppercase italic drop-shadow-[0_40px_100px_rgba(0,0,0,0.9)]">
                {displayTitle}
              </h1>
              <p className="text-xl md:text-3xl text-slate-500 font-black max-w-5xl mx-auto leading-relaxed italic uppercase tracking-tight">
                {displaySubtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[65vh] md:h-[80vh] -mt-20 mb-32 px-6 md:px-16 lg:px-32">
        <div className="w-full h-full relative rounded-[5rem] lg:rounded-[7rem] overflow-hidden border border-black/10 shadow-[0_100px_200px_rgba(0,0,0,1)] bg-black group">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ scale: 1.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image 
                src={activeSlide.image_url} 
                alt={activeSlide.title} 
                fill 
                className="object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-[5s] group-hover:opacity-80"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-[#050811]/70" />
            </motion.div>
          </AnimatePresence>

          {/* Slide Text Content overlay */}
          <div className="absolute bottom-24 left-16 md:left-32 z-30 max-w-3xl">
             <motion.div
               key={`text-${activeSlide.id}`}
               initial={{ opacity: 0, x: -60 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
               className="space-y-8"
             >
                <div className="h-1.5 w-32 bg-primary rounded-full shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
                <h3 className="text-5xl md:text-8xl font-black text-slate-900 uppercase tracking-tighter italic leading-[0.85] drop-shadow-2xl">{activeSlide.title}</h3>
                <p className="text-primary font-black uppercase tracking-[0.6em] text-[12px] italic">{activeSlide.subtitle}</p>
             </motion.div>
          </div>

          {/* Indicators */}
          {slides.length > 1 && (
            <div className="absolute bottom-24 right-16 md:right-32 flex gap-8 z-30">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className="group py-4 focus:outline-none"
                >
                  <div className={cn(
                    "h-1.5 transition-all duration-1000 rounded-full",
                    i === currentSlide ? "w-24 bg-primary shadow-[0_0_30px_rgba(239,68,68,0.8)]" : "w-8 bg-black/5 hover:bg-black/20"
                  )} />
                </button>
              ))}
            </div>
          )}

          {/* Verification Badge */}
          <div className="absolute top-16 left-16 md:left-32 z-30 hidden md:flex items-center gap-4 px-8 py-4 bg-black/60 backdrop-blur-3xl border border-black/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
             <ShieldAlert className="w-5 h-5 text-primary" />
             <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] italic leading-none">LAB VERIFIED SECURE NODE</span>
          </div>

          <div className="absolute top-16 right-16 md:right-32 z-30 hidden md:flex items-center gap-4 text-slate-800">
             <Terminal className="w-8 h-8" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">ACTIVE_INVENTORY_SCAN</span>
          </div>
        </div>
      </div>
    </div>
  );
}
