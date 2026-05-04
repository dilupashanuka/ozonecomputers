"use client"

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, LayoutGrid, Zap, Activity, Terminal } from 'lucide-react';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  slug: string;
  image_url?: string;
  description?: string;
  inventory_type: string;
  parent_id?: string | null;
}

interface CategoryNavigatorProps {
  categories: Category[];
  currentInventory?: string;
}

export function CategoryNavigator({ categories, currentInventory }: CategoryNavigatorProps) {
  const filteredCategories = currentInventory 
    ? categories.filter(c => c.inventory_type === currentInventory && !c.parent_id)
    : [];

  if (filteredCategories.length === 0) return null;

  return (
    <div className="space-y-16 mb-32 animate-in fade-in slide-in-from-bottom-12 duration-1000 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-10 gap-8">
        <div className="space-y-6">
           <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-2xl shadow-2xl">
             <Activity className="w-4 h-4 text-primary animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic leading-none">SECTOR SEGMENTATION</span>
           </div>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-2xl">
            ELITE <span className="text-primary italic">NODES</span>
          </h2>
          <p className="text-slate-700 text-[11px] font-black uppercase tracking-[0.5em] italic leading-none">SECURE A LABORATORY SECTOR TO ANALYZE ACTIVE DEPLOYMENTS.</p>
        </div>
        <div className="flex items-center gap-4 text-slate-800">
           <Terminal className="w-8 h-8" />
           <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">READY FOR SECTOR SCAN</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link 
              href={`/products?category=${category.slug}${currentInventory ? `&inventory=${currentInventory}` : ''}`}
              className="group block relative aspect-[4/6] rounded-[4rem] overflow-hidden bg-white/[0.01] border border-white/5 hover:border-primary/60 transition-all duration-700 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative"
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />
              
              {category.image_url ? (
                <Image 
                  src={category.image_url} 
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-[2.5s] group-hover:scale-125 opacity-20 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-40 transition-all duration-700">
                   <LayoutGrid className="w-16 h-16 text-primary" />
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent z-10" />
              
              <div className="absolute inset-x-0 bottom-0 p-10 space-y-4 z-20">
                <div className="h-1 w-12 bg-primary/20 group-hover:w-full transition-all duration-1000 rounded-full" />
                <h3 className="text-lg font-black text-white group-hover:text-primary transition-colors uppercase tracking-tighter leading-none italic drop-shadow-2xl">
                  {category.name}
                </h3>
                <div className="flex items-center gap-4 text-[10px] font-black text-primary uppercase tracking-[0.4em] translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 italic">
                  INITIALIZE <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>

              {/* Lab Corner Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl pointer-events-none" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
