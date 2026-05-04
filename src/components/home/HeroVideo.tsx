"use client"

import { useRef } from "react";
import { Play, ShieldCheck, Zap, Activity, Terminal, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface HeroVideoProps {
  videos: {
    video_url: string;
    title?: string;
    subtitle?: string;
  }[];
}

export function HeroVideo({ videos }: HeroVideoProps) {
  if (!videos?.length) return null;
  const activeVideo = videos[0];
  const hasText = activeVideo.title || activeVideo.subtitle;
  
  return (
    <section className="relative w-full h-[90vh] overflow-hidden bg-[#050811]">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 w-full h-full group"
      >
        <video 
          src={activeVideo.video_url} 
          className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000" 
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050811]/80 via-transparent to-[#050811]" />
        
        {hasText && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="w-28 h-28 rounded-[2.5rem] bg-primary/20 backdrop-blur-2xl border border-primary/30 flex items-center justify-center mb-16 group-hover:scale-110 group-hover:rotate-12 transition-all cursor-pointer shadow-[0_20px_50px_rgba(239,68,68,0.4)]"
            >
              <Play className="w-12 h-12 text-white fill-current ml-1" />
            </motion.div>

            {activeVideo.title && (
              <motion.h2 
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-6xl md:text-[10rem] font-black text-white uppercase tracking-tighter max-w-7xl leading-[0.8] mb-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] italic"
              >
                {activeVideo.title}
              </motion.h2>
            )}
            
            {activeVideo.subtitle && (
              <motion.p 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                className="text-primary text-xl md:text-4xl font-black uppercase tracking-[0.4em] max-w-4xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] italic"
              >
                {activeVideo.subtitle}
              </motion.p>
            )}
          </div>
        )}

        <div className="absolute bottom-16 left-12 right-12 flex flex-wrap items-center justify-between gap-10 z-10 hidden md:flex border-t border-white/10 pt-12">
          <div className="flex items-center gap-16">
             <div className="flex items-center gap-6 group/item">
               <div className="w-16 h-16 rounded-[1.25rem] bg-white/[0.03] border border-white/10 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-all duration-500 shadow-2xl">
                  <ShieldCheck className="w-8 h-8" />
               </div>
               <div className="flex flex-col space-y-1">
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] italic leading-none">VERIFIED LABS</span>
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] italic">GENUINE PROTECTION</span>
               </div>
             </div>
             <div className="flex items-center gap-6 group/item">
               <div className="w-16 h-16 rounded-[1.25rem] bg-white/[0.03] border border-white/10 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-all duration-500 shadow-2xl">
                  <Zap className="w-8 h-8" />
               </div>
               <div className="flex flex-col space-y-1">
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] italic leading-none">OVERCLOCKED</span>
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] italic">PEAK EFFICIENCY</span>
               </div>
             </div>
          </div>
          
          <div className="flex items-center gap-10">
             <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-4">
                   <Activity className="w-4 h-4 text-primary animate-pulse" />
                   <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] italic">CORE SYSTEM ACTIVE</span>
                </div>
                <div className="h-1.5 w-64 bg-white/[0.03] rounded-full overflow-hidden backdrop-blur-2xl border border-white/5 shadow-2xl">
                  <motion.div 
                    className="h-full bg-primary shadow-[0_0_20px_rgba(239,68,68,0.8)]"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
                </div>
             </div>
             <div className="w-16 h-16 rounded-[1.25rem] bg-white/[0.03] border border-white/10 flex items-center justify-center">
                <Terminal className="w-8 h-8 text-slate-800" />
             </div>
          </div>
        </div>

        {/* Lab UI Elements */}
        <div className="absolute top-12 left-12 flex items-center gap-6 opacity-40 z-10">
           <div className="w-3 h-3 rounded-full bg-primary animate-ping" />
           <span className="text-[10px] font-black text-white uppercase tracking-[0.5em] italic">LIVE FEED</span>
        </div>
        <div className="absolute top-12 right-12 flex items-center gap-6 opacity-40 z-10">
           <Globe className="w-4 h-4 text-white animate-spin-slow" />
           <span className="text-[10px] font-black text-white uppercase tracking-[0.5em] italic">GLOBAL UPLINK</span>
        </div>
      </motion.div>
    </section>
  );
}
