"use client"

import { Star, Quote, Sparkles, Activity, ShieldCheck, Terminal, Zap } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  review_text: string;
  avatar_url?: string;
  created_at: string;
}

export function ReviewsSection({ reviews = [] }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;

  return (
    <section className="py-64 relative overflow-hidden bg-slate-50">
      {/* Decorative glows */}
      <div className="absolute top-0 left-1/4 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-48 space-y-10">
          <div className="inline-flex items-center gap-6 px-10 py-4 rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_80px_rgba(239,68,68,0.3)]">
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[0.6em] text-primary italic leading-none">LAB VERIFIED TESTIMONIALS</span>
          </div>
          <h2 className="text-[5rem] md:text-[10rem] font-black text-slate-900 tracking-tighter leading-[0.8] uppercase italic drop-shadow-2xl">
            ELITE <span className="text-primary italic">FEEDBACK</span>
          </h2>
          <div className="flex items-center justify-center gap-6 text-slate-800">
             <Terminal className="w-8 h-8" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">READY_FOR_VALIDATION</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
          {reviews.map((review, idx) => (
            <div key={review.id} className="p-16 rounded-[5rem] bg-black/[0.01] border border-black/5 relative group hover:border-primary/60 transition-all duration-1000 hover:-translate-y-6 shadow-[0_50px_150px_rgba(0,0,0,0.9)]">
              <Quote className="absolute top-16 right-16 w-24 h-24 text-white/[0.02] group-hover:text-primary/10 transition-all duration-1000 transform group-hover:rotate-12" />
              
              <div className="flex gap-3 mb-12">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                        "w-6 h-6 transition-all duration-700",
                        i < review.rating ? "text-primary fill-primary drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" : "text-slate-900"
                    )} 
                  />
                ))}
              </div>

              <p className="text-2xl text-slate-700 font-black uppercase tracking-tight italic leading-relaxed mb-16 group-hover:text-slate-500 transition-colors duration-700">
                &quot;{review.review_text}&quot;
              </p>

              <div className="flex items-center gap-8 pt-12 border-t border-black/5 relative z-10">
                <div className="w-20 h-20 rounded-3xl overflow-hidden bg-black/[0.02] border border-black/5 flex items-center justify-center text-primary font-black relative group-hover:border-primary/50 transition-all duration-700 grayscale group-hover:grayscale-0 shadow-2xl">
                  {review.avatar_url ? (
                    <Image src={review.avatar_url} alt={review.customer_name} fill sizes="80px" className="object-cover opacity-30 group-hover:opacity-100 transition-all duration-1000" />
                  ) : (
                    <span className="text-3xl italic">{review.customer_name.charAt(0)}</span>
                  )}
                </div>
                <div className="space-y-3">
                  <h4 className="text-slate-900 font-black uppercase tracking-tighter italic text-2xl leading-none group-hover:text-primary transition-colors duration-700">{review.customer_name}</h4>
                  <div className="flex items-center gap-4">
                     <ShieldCheck className="w-4 h-4 text-primary" />
                     <span className="text-slate-800 text-[11px] font-black uppercase tracking-[0.4em] italic leading-none">LAB VERIFIED CLIENT</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lab Stats */}
        <div className="mt-56 grid grid-cols-2 lg:grid-cols-4 gap-14 p-16 bg-black/[0.01] rounded-[6rem] border border-black/5 relative overflow-hidden group shadow-[0_60px_200px_rgba(0,0,0,1)]">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[1.5s]" />
           <StatItem label="TOTAL DEPLOYMENTS" value="4.8K+" />
           <StatItem label="SATISFACTION_RATE" value="99.9%" />
           <StatItem label="UPTIME_STATUS" value="100%" color="text-primary" />
           <StatItem label="OPERATORS_ACTIVE" value="24/7" />
           
           <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-20 group-hover:opacity-100 transition-opacity duration-1000">
              <div className="w-32 h-px bg-slate-200" />
              <Zap className="w-5 h-5 text-primary animate-pulse" />
              <div className="w-32 h-px bg-slate-200" />
           </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ label, value, color = "text-slate-900" }: { label: string, value: string, color?: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 relative z-10 py-6 border-x border-white/[0.02]">
       <span className={cn("text-5xl md:text-7xl font-black italic tracking-tighter leading-none drop-shadow-2xl", color)}>{value}</span>
       <span className="text-[11px] font-black text-slate-800 uppercase tracking-[0.5em] italic leading-none">{label}</span>
    </div>
  )
}
