'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { ShoppingCart, Activity, Terminal } from 'lucide-react';

export function ProductGridClient({ products }: { products: any[] }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={products.length > 0 ? products[0].id : 'empty'} // Force re-animation on product change
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {!products || products.length === 0 ? (
          <div className="text-center py-56 bg-black/[0.01] rounded-[5rem] border border-dashed border-black/5 relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="w-40 h-40 rounded-[3rem] bg-black/[0.03] border border-black/5 flex items-center justify-center mx-auto mb-12 transition-all duration-1000 group-hover:bg-primary/10 group-hover:scale-110 shadow-2xl">
              <Terminal className="w-16 h-16 text-slate-800 group-hover:text-primary transition-colors duration-700" />
            </div>
            <h3 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 uppercase tracking-tighter italic drop-shadow-2xl">LAB SECTOR <span className="text-primary italic">VACANT</span></h3>
            <p className="text-slate-700 font-black text-sm uppercase tracking-[0.5em] max-w-lg mx-auto italic leading-relaxed">
              ADJUST YOUR SECTOR PARAMETERS OR AWAIT NEXT LABORATORY SHIPMENT SYNCHRONIZATION PROTOCOL.
            </p>
            <div className="mt-16 inline-flex items-center gap-6 px-10 py-4 bg-black/[0.02] rounded-full border border-black/5">
               <Activity className="w-5 h-5 text-primary animate-pulse" />
               <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.6em] italic leading-none">AWAITING_UPLINK</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.8, ease: "easeOut" }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
