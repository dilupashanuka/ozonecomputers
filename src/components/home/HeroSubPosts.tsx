"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Zap, Activity, Terminal } from "lucide-react";

interface HeroSubPost {
  id: string;
  image_url: string;
  title: string;
  link_url: string;
}

interface HeroSubPostsProps {
  posts: HeroSubPost[];
}

export function HeroSubPosts({ posts }: HeroSubPostsProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!posts || posts.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % posts.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [posts]);

  if (!isMounted || !posts?.length) return null;

  return (
    <section className="relative w-full h-[75vh] md:h-[90vh] overflow-hidden bg-[#050811]">
      {posts.map((post, index) => (
        <Link 
          key={post.id}
          href={post.link_url}
          className={cn(
            "absolute inset-0 block transition-all duration-[2.5s] ease-[0.16,1,0.3,1] cursor-pointer",
            index === currentSlide ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-125"
          )}
        >
          <Image 
            src={post.image_url} 
            alt={post.title} 
            fill 
            className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-[3s]" 
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/40 to-[#050811]/60" />
          
          <div className="absolute bottom-32 left-16 md:left-32 max-w-5xl space-y-12">
             <div className="flex items-center gap-6 animate-in fade-in slide-in-from-left-12 duration-1000">
                <div className="inline-flex items-center gap-6 px-10 py-4 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-3xl shadow-[0_0_50px_rgba(239,68,68,0.3)]">
                   <Activity className="w-6 h-6 text-primary animate-pulse" />
                   <span className="text-[11px] font-black uppercase tracking-[0.6em] text-primary italic leading-none">OZONE LAB INTEL FEED</span>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-800 shadow-2xl">
                   <Terminal className="w-8 h-8" />
                </div>
             </div>
             <h3 className="text-[5rem] md:text-[10rem] font-black text-white uppercase tracking-tighter italic leading-[0.8] drop-shadow-[0_40px_100px_rgba(0,0,0,0.9)]">
                {post.title}
             </h3>
             <div className="flex items-center gap-8 text-[12px] font-black uppercase tracking-[0.5em] text-slate-600 italic">
                <Zap className="w-5 h-5 text-primary" />
                INITIALIZE ACCESS PROTOCOL
             </div>
          </div>
        </Link>
      ))}

      {/* Cinematic Indicators */}
      {posts.length > 1 && (
        <div className="absolute bottom-20 right-16 md:right-32 flex items-center gap-10 z-20">
           <div className="text-[10px] font-black text-slate-800 uppercase tracking-[0.6em] italic">ACTIVE_UPLINK</div>
           <div className="flex gap-6">
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentSlide(i);
                }}
                className="group py-4"
              >
                <div className={cn(
                  "h-1.5 transition-all duration-1000 rounded-full",
                  i === currentSlide ? "w-32 bg-primary shadow-[0_0_30px_rgba(239,68,68,0.8)]" : "w-10 bg-white/5 hover:bg-white/20"
                )} />
              </button>
            ))}
           </div>
        </div>
      )}

      {/* Decorative Overlays */}
      <div className="absolute top-16 left-16 w-48 h-px bg-white/5 z-20" />
      <div className="absolute top-16 left-16 h-48 w-px bg-white/5 z-20" />
      <div className="absolute bottom-16 right-16 w-48 h-px bg-white/5 z-20" />
      <div className="absolute bottom-16 right-16 h-48 w-px bg-white/5 z-20" />
      
      {/* Corner UI */}
      <div className="absolute top-16 right-16 z-20 flex flex-col items-end gap-2 text-slate-900 font-black text-[9px] uppercase tracking-widest italic">
         <span>DEPLOYMENT_STAMP_2026</span>
         <span>OZONE_CORE_SYNC</span>
      </div>
    </section>
  );
}
