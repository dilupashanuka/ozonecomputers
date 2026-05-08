"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Zap, Activity, Terminal } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: { name: string };
}

interface TrendingAccessoriesProps {
  products: Product[];
}

export function TrendingAccessories({ products }: TrendingAccessoriesProps) {
  if (!products?.length) return null;

  return (
    <section className="py-56 relative bg-slate-50 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 blur-[200px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1800px] mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-14">
          <div className="space-y-8">
             <div className="inline-flex items-center gap-6 px-8 py-3 rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
               <Zap className="w-5 h-5 text-primary animate-pulse" />
               <span className="text-[11px] font-black uppercase tracking-[0.6em] text-primary italic leading-none">LAB TESTED ELITE MODULES</span>
             </div>
            <h2 className="text-[5rem] md:text-[9rem] font-black text-slate-900 uppercase tracking-tighter italic leading-[0.8] drop-shadow-2xl">
              ELITE <span className="text-primary italic">ADD-ONS</span>
            </h2>
            <p className="text-slate-700 font-black uppercase tracking-[0.6em] text-[12px] italic max-w-2xl leading-relaxed">
              PREMIUM HARDWARE MODULES TO COMPLEMENT YOUR HIGH-IMPACT ARCHITECTURE.
            </p>
          </div>
          <Link href="/products?inventory=components" className="hidden lg:flex items-center gap-10 text-slate-700 hover:text-slate-900 transition-all duration-700 text-[12px] font-black uppercase tracking-[0.6em] group italic">
            ALL COMPONENTS SCAN 
            <div className="w-24 h-24 rounded-3xl border border-black/5 flex items-center justify-center group-hover:bg-primary group-hover:text-slate-900 group-hover:border-primary transition-all duration-700 shadow-2xl group-hover:shadow-[0_0_50px_rgba(239,68,68,0.5)] transform group-hover:scale-110">
               <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform duration-700" />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Link href={`/products/${product.id}`} className="group block bg-black/[0.01] rounded-[4rem] p-10 border border-black/5 hover:border-primary/60 transition-all duration-1000 h-full relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="relative aspect-square rounded-[3rem] overflow-hidden mb-12 bg-black/[0.02] group-hover:bg-white/[0.05] transition-all duration-1000 p-12 grayscale group-hover:grayscale-0 flex items-center justify-center">
                  <Image 
                    src={product.image_url} 
                    alt={product.name} 
                    fill 
                    className="object-contain p-6 transition-transform duration-[1.5s] group-hover:scale-115 group-hover:rotate-3" 
                  />
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-x-10 group-hover:translate-x-0">
                    <div className="w-16 h-16 rounded-2xl bg-primary text-slate-900 flex items-center justify-center shadow-[0_20px_40px_rgba(239,68,68,0.5)]">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6 flex-1 flex flex-col justify-end">
                  <div className="flex items-center gap-4">
                     <Activity className="w-4 h-4 text-primary animate-pulse" />
                     <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.5em] italic leading-none">{product.category.name}</p>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 truncate uppercase italic tracking-tighter leading-none group-hover:text-primary transition-colors duration-700 drop-shadow-2xl">{product.name}</h3>
                  <div className="pt-8 border-t border-black/5">
                    <p className="text-3xl font-black text-slate-900 tracking-widest leading-none italic group-hover:scale-110 transition-transform origin-left duration-700 drop-shadow-2xl">
                      Rs. {product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                {/* Lab Decoration */}
                <div className="absolute top-6 left-6 text-slate-900">
                   <Terminal className="w-5 h-5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <Link href="/products?inventory=components" className="flex lg:hidden items-center justify-center gap-8 text-slate-700 mt-24 text-[12px] font-black uppercase tracking-[0.6em] p-12 bg-black/[0.02] border border-black/5 rounded-[3rem] italic active:bg-primary/20 transition-all duration-700 active:scale-95 shadow-2xl">
          ALL COMPONENTS SCAN <ArrowRight className="w-6 h-6 text-primary group-hover:translate-x-4 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
