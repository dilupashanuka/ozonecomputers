"use client"

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ShoppingCart, MessageCircle, Activity, ShieldAlert, Cpu, Terminal, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
  in_stock: boolean;
  specifications?: Record<string, string>;
  brand?: string;
}

export function QuickView({ product, children }: { product: Product, children: React.ReactElement }) {
  const mainWaNumber = '94777539333';
  const whatsappUrl = `https://wa.me/${mainWaNumber}?text=Hi OZONE Labs! I'm interested in: ${product.title}`;

  return (
    <Dialog>
      <DialogTrigger render={children} />
      <DialogContent className="max-w-6xl p-0 overflow-hidden bg-slate-50/95 border border-black/10 rounded-[4rem] shadow-[0_100px_200px_rgba(0,0,0,1)] backdrop-blur-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full max-h-[85vh] overflow-y-auto custom-scrollbar">
          {/* Left Column: Image */}
          <div className="relative bg-slate-50 flex items-center justify-center p-16 min-h-[500px] md:h-auto group">
             <div className="absolute inset-0 bg-primary/5 blur-[100px] pointer-events-none opacity-50" />
            {product.image_url ? (
              <Image 
                src={product.image_url} 
                alt={product.title} 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw" 
                className="object-contain p-20 relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-[1.5s] opacity-90 grayscale group-hover:grayscale-0" 
              />
            ) : (
              <Terminal className="w-40 h-40 text-slate-800 relative z-10" />
            )}
            
            <div className="absolute top-12 left-12 z-20 flex items-center gap-4 px-6 py-3 bg-black/60 backdrop-blur-3xl border border-black/10 rounded-2xl shadow-2xl">
               <Activity className="w-5 h-5 text-primary animate-pulse" />
               <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] italic leading-none">LAB STATUS: READY</span>
            </div>
            
            <div className="absolute bottom-12 left-12 z-20 flex items-center gap-3 text-slate-800">
               <Terminal className="w-6 h-6" />
               <span className="text-[9px] font-black uppercase tracking-[0.3em] italic">ACTIVE_INVENTORY_SCAN</span>
            </div>
          </div>
          
          {/* Right Column: Details */}
          <div className="p-12 md:p-20 space-y-12 flex flex-col relative bg-black/40">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] pointer-events-none" />
            
            <div className="space-y-8 relative z-10">
              <div className="space-y-4">
                 {product.brand && (
                    <div className="flex items-center gap-3">
                       <Zap className="w-4 h-4 text-primary" />
                       <p className="text-[11px] text-primary font-black uppercase tracking-[0.6em] italic leading-none">{product.brand} CORE</p>
                    </div>
                 )}
                 <DialogTitle className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter italic leading-[0.85] drop-shadow-2xl">
                   {product.title}
                 </DialogTitle>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <Badge className="bg-black/5 text-slate-500 border-black/5 px-6 py-2.5 font-black uppercase tracking-[0.3em] text-[10px] italic rounded-xl">{product.category}</Badge>
                {product.in_stock ? (
                  <Badge className="bg-primary/10 text-primary border-primary/20 px-6 py-2.5 font-black uppercase tracking-[0.3em] text-[10px] italic rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.3)]">IN_STOCK</Badge>
                ) : (
                  <Badge className="bg-black/5 text-slate-800 border-black/5 px-6 py-2.5 font-black uppercase tracking-[0.3em] text-[10px] italic rounded-xl">ALLOCATED</Badge>
                )}
              </div>
              
              <div className="text-6xl md:text-7xl font-black text-slate-900 italic tracking-tighter pt-4 drop-shadow-2xl">
                {product.price ? `Rs. ${product.price.toLocaleString()}` : 'ENQUIRE'}
              </div>
            </div>

            <div className="flex flex-col gap-6 pb-12 border-b border-black/5 relative z-10">
              <a 
                href={whatsappUrl}
                target="_blank"
                className="w-full h-20 bg-primary text-slate-900 font-black uppercase tracking-[0.5em] text-sm rounded-[1.5rem] flex items-center justify-center gap-6 hover:bg-primary/90 transition-all shadow-[0_20px_60px_rgba(239,68,68,0.4)] transform hover:-translate-y-1.5 active:scale-95 italic"
              >
                <MessageCircle className="w-8 h-8" />
                INITIALIZE ORDER
              </a>
              <div className="flex items-center justify-center gap-4 text-[10px] text-slate-700 uppercase tracking-[0.5em] font-black italic">
                 <ShieldAlert className="w-5 h-5" />
                 LAB VERIFIED ELITE COMPONENT
              </div>
            </div>

            {/* Specifications Table */}
            <div className="space-y-8 flex-1 relative z-10">
              <div className="flex items-center gap-6">
                 <p className="text-[11px] text-slate-800 font-black uppercase tracking-[0.6em] italic leading-none">LAB INTEL REPORT</p>
                 <div className="h-px flex-1 bg-black/5" />
              </div>
              
              {product.specifications && Object.keys(product.specifications).length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(product.specifications).slice(0, 8).map(([key, value], idx) => (
                    <div 
                      key={key} 
                      className="flex items-center justify-between p-6 rounded-2xl bg-black/[0.02] border border-black/5 group/row hover:border-primary/40 transition-all duration-700"
                    >
                      <div className="text-[11px] text-slate-800 font-black uppercase tracking-[0.3em] italic group-hover/row:text-primary transition-colors">{key}</div>
                      <div className="text-sm font-black text-slate-900 italic uppercase tracking-tight">{value as string}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-600 text-base leading-relaxed italic uppercase font-black tracking-tight">{product.description}</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
