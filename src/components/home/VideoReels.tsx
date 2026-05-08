"use client"

import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Sparkles, ChevronRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface Reel {
  id: string;
  video_url: string;
  title: string;
  category: string;
}

export function VideoReels({ reels = [] }: { reels: Reel[] }) {
  if (reels.length === 0) return null;

  return (
    <section className="py-40 bg-black overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Zap className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Lab Bench Reels</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
              Elite <span className="text-gradient">Showcase</span>
            </h2>
          </div>
          <button className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-all group">
            Watch Full Lab Session
            <div className="w-12 h-12 rounded-2xl border border-black/10 flex items-center justify-center group-hover:bg-primary group-hover:text-slate-900 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all">
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-8 overflow-x-auto px-[5%] pb-12 no-scrollbar snap-x scroll-px-4">
          {reels.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReelCard({ reel }: { reel: Reel }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-[300px] md:w-[350px] aspect-[9/16] shrink-0 snap-start relative rounded-[3rem] overflow-hidden group border border-black/5 bg-slate-100 shadow-2xl transition-all duration-700 hover:scale-[1.02]">
      <video
        ref={videoRef}
        src={reel.video_url}
        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
        loop
        muted={isMuted}
        playsInline
        onMouseEnter={() => {
            videoRef.current?.play();
            setIsPlaying(true);
        }}
        onMouseLeave={() => {
            videoRef.current?.pause();
            setIsPlaying(false);
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
      
      {/* Controls */}
      <div className="absolute top-8 right-8 flex flex-col gap-4">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-md border border-black/10 flex items-center justify-center text-slate-900 hover:bg-primary transition-all"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Info */}
      <div className="absolute bottom-10 left-10 right-10">
        <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-3 block">{reel.category}</span>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight uppercase italic">{reel.title}</h3>
      </div>

      {/* Play Icon (Visible when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 rounded-[2rem] bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center text-slate-900">
            <Play className="w-8 h-8 fill-white" />
          </div>
        </div>
      )}
    </div>
  );
}
