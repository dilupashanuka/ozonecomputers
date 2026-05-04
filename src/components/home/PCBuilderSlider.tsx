'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Cpu, ArrowRight, Zap, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PCSlide {
  id: string;
  image_url: string;
}

interface PCBuilderProps {
  slides: PCSlide[];
  settings?: {
    pc_builder_title?: string;
    pc_builder_subtitle?: string;
  };
}

export function PCBuilderSlider({ slides, settings }: PCBuilderProps) {
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (!mounted || !slides || slides.length === 0) return null;

  const title = settings?.pc_builder_title || "ARCHITECT YOUR MASTERPIECE";
  const subtitle = settings?.pc_builder_subtitle || "Your dream setup is just a few blueprints away. Choose from our elite, lab-verified component modules.";

  return (
    <section className="py-32 w-full relative z-20 bg-[#050811]">
      <div className="relative h-[700px] md:h-[900px] w-full overflow-hidden rounded-[4rem] mx-auto max-w-[1800px] shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/5">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1500 ease-in-out",
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            )}
          >
            <Image 
              src={slide.image_url} 
              alt="Elite PC Configuration" 
              fill 
              sizes="100vw" 
              className="object-cover opacity-50 transition-transform duration-[15000ms] ease-out scale-110 grayscale" 
              priority={index === 0}
            />
          </div>
        ))}
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#050811] via-[#050811]/40 to-transparent z-10" />
        
        <div className="absolute inset-0 flex items-center px-12 md:px-32 z-20">
          <div className="max-w-5xl space-y-12">
            <div className="inline-flex items-center gap-5 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 shadow-2xl animate-in fade-in slide-in-from-left-8 duration-700">
              <Zap className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic">EXTREME BLUEPRINT CONFIG</span>
            </div>
            <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] animate-in fade-in slide-in-from-bottom-12 duration-1000 uppercase italic">
              {title.split(' ').map((word, i) => (
                <span key={i} className={cn(
                  (word.toLowerCase() === 'masterpiece' || word.toLowerCase() === 'architect' || word.toLowerCase() === 'blueprints') ? 'text-primary' : '',
                  "inline-block mr-4"
                )}>
                  {word}{' '}
                  {i === 1 && <br />}
                </span>
              ))}
            </h2>
            <p className="text-xl md:text-2xl text-slate-500 font-black uppercase tracking-tight italic leading-relaxed max-w-xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
              {subtitle}
            </p>
            <div className="flex items-center gap-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
              <Link 
                href="/pc-builder" 
                className="inline-flex h-24 items-center px-16 bg-primary text-white font-black uppercase tracking-[0.3em] rounded-2xl text-xs md:text-sm shadow-[0_20px_60px_rgba(239,68,68,0.4)] hover:shadow-primary/60 transition-all active:scale-95 transform hover:-translate-y-2 italic group"
              >
                INITIALIZE BUILD
                <ArrowRight className="ml-4 w-7 h-7 group-hover:translate-x-3 transition-transform" />
              </Link>
              <div className="hidden md:flex items-center gap-4">
                 <Activity className="w-5 h-5 text-primary animate-pulse" />
                 <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] italic">LAB OPERATIONAL</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-20 right-12 md:right-32 z-30 flex flex-col gap-5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  "w-1 transition-all duration-700 rounded-full shadow-2xl",
                  i === current ? 'h-20 bg-primary shadow-primary/50' : 'h-8 bg-white/10 hover:bg-white/30'
                )}
              />
            ))}
          </div>
        )}

        {/* Decorative Lab Borders */}
        <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-primary/30 pointer-events-none rounded-tl-3xl" />
        <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-primary/30 pointer-events-none rounded-tr-3xl" />
        <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-primary/30 pointer-events-none rounded-bl-3xl" />
        <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-primary/30 pointer-events-none rounded-br-3xl" />
      </div>
    </section>
  );
}
