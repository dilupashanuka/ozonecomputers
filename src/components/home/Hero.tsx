"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play, Sparkles, Activity, Zap, Cpu, Terminal } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Slide {
  id: string;
  image_url: string;
  video_url?: string;
  title: string;
  subtitle: string;
}

interface HeroProps {
  slides?: Slide[];
  settings?: {
    hero_title?: string;
    hero_subtitle?: string;
    hero_video_url?: string;
  };
}

export function Hero({ slides = [], settings }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (slides.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  if (!isMounted) return null;

  const displaySlides = slides;
  
  const title = settings?.hero_title || 'OZONE LABS PRODUCTION RIGS';
  const subtitle = settings?.hero_subtitle || 'Sri Lanka\'s elite destination for high-impact gaming architecture and precision workstations. Operational across 3 strategic branches.';

  return (
    <section className="relative h-screen min-h-[800px] w-full overflow-hidden bg-[#050811]">
      {/* Background Slides */}
      {displaySlides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === currentSlide ? "opacity-100" : "opacity-0"
          )}
        >
          {slide.video_url ? (
            <>
              <video
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover opacity-60 transition-transform duration-[15000ms] ease-out scale-110 grayscale group-hover:grayscale-0"
              >
                <source src={slide.video_url} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-[#050811] via-[#050811]/60 to-transparent z-[1]" />
            </>
          ) : (
            <>
              <Image
                src={slide.image_url}
                alt="Hero Background"
                fill
                sizes="100vw"
                className="object-cover opacity-60 transition-transform duration-[15000ms] ease-out scale-110 grayscale"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050811] via-[#050811]/60 to-transparent z-[1]" />
            </>
          )}
        </div>
      ))}

      {/* Content */}
      <div className="container relative z-10 mx-auto flex h-full flex-col justify-center px-6 pt-40 pb-24">
        <div className="max-w-5xl space-y-12">
          <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-left-8 duration-700">
             <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-2xl shadow-2xl">
                <Activity className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic leading-none">OZONE HUB ACTIVATED</span>
             </div>
             <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl">
                <Terminal className="w-4 h-4 text-slate-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 italic leading-none">VERSION 4.0.0</span>
             </div>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white animate-in fade-in slide-in-from-bottom-12 duration-1000 leading-[0.85] uppercase italic">
            {title.split(' ').map((word, i) => (
              <span key={i} className={cn(
                (word.toLowerCase() === 'ozone' || word.toLowerCase() === 'labs' || word.toLowerCase() === 'rigs' || word.toLowerCase() === 'production') ? "text-primary italic drop-shadow-[0_20px_50px_rgba(239,68,68,0.5)]" : "", 
                "inline-block mr-4 md:mr-6"
              )}>
                {word}
              </span>
            ))}
          </h1>

          <p className="max-w-2xl text-base font-black text-slate-500 md:text-xl lg:text-2xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 leading-relaxed uppercase tracking-tight italic">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-6 md:gap-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 pt-8">
            <Link
              href="/products"
              className="group h-20 md:h-24 inline-flex items-center gap-5 rounded-2xl bg-primary px-12 md:px-16 text-xs md:text-sm font-black text-white uppercase tracking-[0.3em] hover:shadow-[0_20px_60px_rgba(239,68,68,0.6)] transition-all transform hover:-translate-y-2 italic shadow-2xl"
            >
              INITIALIZE SCAN
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-3" />
            </Link>
            
            <Link
              href="/pc-builder"
              className="h-20 md:h-24 inline-flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 px-12 md:px-16 text-xs md:text-sm font-black text-white uppercase tracking-[0.3em] backdrop-blur-2xl hover:bg-white/10 transition-all transform hover:-translate-y-2 italic shadow-2xl"
            >
              <Cpu className="w-6 h-6 text-primary" />
              ARCHITECT RIG
            </Link>
          </div>
        </div>
      </div>

      {/* Lab Visualizers */}
      <div className="absolute right-12 bottom-32 hidden xl:flex flex-col gap-8 z-20 animate-in fade-in slide-in-from-right-12 duration-1000 delay-500">
         <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl space-y-6 shadow-2xl transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between gap-12">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] italic">ALLOCATION</span>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-black text-primary uppercase italic">ONLINE</span>
               </div>
            </div>
            <div className="space-y-2">
               <p className="text-3xl font-black text-white uppercase italic tracking-tighter">FLAGSHIP</p>
               <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] italic">RTX 4090 POWERED</p>
            </div>
         </div>

         <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl space-y-6 shadow-2xl transform translate-x-20 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between gap-12">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] italic">NETWORK</span>
               <Zap className="w-4 h-4 text-primary animate-pulse" />
            </div>
            <div className="space-y-2">
               <p className="text-3xl font-black text-white uppercase italic tracking-tighter">BRANCHES</p>
               <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] italic">3 ACTIVE NODES</p>
            </div>
         </div>
      </div>

      {/* Vertical Navigation / Progress */}
      {displaySlides.length > 1 && (
        <div className="absolute bottom-32 left-8 md:left-12 flex flex-col gap-4 z-20">
          {displaySlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "w-1 transition-all duration-500 rounded-full",
                i === currentSlide ? "h-16 bg-primary shadow-[0_0_15px_rgba(239,68,68,0.8)]" : "h-6 bg-white/10 hover:bg-white/30"
              )}
            />
          ))}
        </div>
      )}

      {/* Bottom Interface Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050811] to-transparent z-10" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-12 z-20">
         <div className="flex items-center gap-4 text-[9px] font-black text-slate-700 uppercase tracking-[0.5em] italic">
            <span className="w-2 h-2 rounded-full bg-slate-800" />
            SECURE ACCESS
         </div>
         <div className="flex items-center gap-4 text-[9px] font-black text-slate-700 uppercase tracking-[0.5em] italic">
            <span className="w-2 h-2 rounded-full bg-slate-800" />
            ENCRYPTED COMMS
         </div>
         <div className="flex items-center gap-4 text-[9px] font-black text-slate-700 uppercase tracking-[0.5em] italic">
            <span className="w-2 h-2 rounded-full bg-slate-800" />
            LAB OPERATIONAL
         </div>
      </div>
    </section>
  );
}
