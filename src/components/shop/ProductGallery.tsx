"use client"

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, ChevronLeft, ChevronRight, Activity, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Dedupe and filter empty
  const allImages = Array.from(new Set(images.filter(Boolean)));

  if (allImages.length === 0) {
    return (
      <div className="aspect-square rounded-[4rem] bg-slate-50 flex items-center justify-center border border-black/5 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-primary/5 blur-3xl pointer-events-none" />
        <Terminal className="w-24 h-24 text-slate-800 relative z-10" />
      </div>
    );
  }

  const prev = () => setActiveIndex(i => (i - 1 + allImages.length) % allImages.length);
  const next = () => setActiveIndex(i => (i + 1) % allImages.length);

  return (
    <div className="space-y-10">
      {/* Main Image */}
      <div className="aspect-square relative rounded-[5rem] overflow-hidden bg-slate-50 border border-black/10 group shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/10 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <Image
          key={activeIndex}
          src={allImages[activeIndex]}
          alt={`${title} - image ${activeIndex + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-contain p-16 transition-all duration-[1.5s] group-hover:scale-110 group-hover:rotate-3 opacity-90 relative z-10 grayscale group-hover:grayscale-0"
          priority
        />

        {/* Lab Badge */}
        <div className="absolute top-12 left-12 z-20 flex items-center gap-4 px-6 py-3 bg-black/60 backdrop-blur-3xl border border-black/10 rounded-2xl shadow-2xl">
           <Activity className="w-5 h-5 text-primary animate-pulse" />
           <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] italic leading-none">LAB CAPTURE ARCHIVE</span>
        </div>

        {/* Navigation arrows - only show if multiple images */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-10 top-1/2 -translate-y-1/2 w-16 h-16 rounded-[1.25rem] bg-black/60 backdrop-blur-3xl border border-black/10 text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:border-primary shadow-2xl z-30 transform hover:scale-110 active:scale-90"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={next}
              className="absolute right-10 top-1/2 -translate-y-1/2 w-16 h-16 rounded-[1.25rem] bg-black/60 backdrop-blur-3xl border border-black/10 text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:border-primary shadow-2xl z-30 transform hover:scale-110 active:scale-90"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            {/* Dot indicators */}
            <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-4 z-30">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="p-2"
                >
                  <div className={cn(
                    "h-1.5 transition-all duration-1000 rounded-full",
                    i === activeIndex ? "bg-primary w-16 shadow-[0_0_20px_rgba(239,68,68,1)]" : "bg-black/10 hover:bg-white/30 w-6"
                  )} />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails row */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-6">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "aspect-square relative rounded-[2rem] overflow-hidden border-2 transition-all duration-700 relative",
                i === activeIndex
                  ? "border-primary shadow-[0_15px_40px_rgba(239,68,68,0.3)] scale-105"
                  : "border-black/5 bg-black/[0.01] hover:border-black/20 hover:bg-black/[0.03]"
              )}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${i + 1}`}
                fill
                sizes="15vw"
                className={cn(
                  "object-contain p-6 transition-all duration-1000",
                  i === activeIndex ? "opacity-100 grayscale-0" : "opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-100"
                )}
              />
              {i === activeIndex && (
                 <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
