"use client"

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Zap, ShoppingBag, Activity, Terminal } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { WishlistButton } from '@/components/shop/WishlistButton';
import { cn } from '@/lib/utils';

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

export function ProductCard({ product }: { product: Product }) {
  const mainWaNumber = '94777539333';
  const whatsappUrl = `https://wa.me/${mainWaNumber}?text=I'm interested in buying ${product.title} (ID: ${product.id})`;

  return (
    <Card className="group overflow-hidden flex flex-col bg-black/[0.02] border border-black/5 hover:border-primary/50 transition-all duration-700 rounded-[3rem] h-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
      <Link href={`/products/${product.id}`} className="relative flex-1 flex flex-col group/item">
        {/* Image Area */}
        <div className="relative aspect-square bg-black/[0.03] p-12 flex items-center justify-center transition-all duration-700 group-hover/item:bg-white/[0.06] grayscale group-hover/item:grayscale-0">
          {product.image_url ? (
            <Image 
              src={product.image_url} 
              alt={product.title} 
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-contain p-8 transition-transform duration-1000 group-hover/item:scale-110"
            />
          ) : (
            <ShoppingBag className="w-24 h-24 text-white/5" />
          )}

          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] pointer-events-none" />

          {/* Wishlist Button - Top Left */}
          <div className="absolute top-8 left-8 z-20">
             <WishlistButton productId={product.id} size="sm" />
          </div>

          {/* Stock Badge - Top Right */}
          <div className="absolute top-8 right-8 z-20">
            {product.in_stock ? (
              <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-3xl shadow-2xl">
                <Activity className="w-3 h-3 text-primary animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary italic">OPERATIONAL</span>
              </div>
            ) : (
              <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-black/[0.02] border border-black/5 backdrop-blur-3xl">
                <div className="w-2 h-2 rounded-full bg-slate-200" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-700 italic">DEPLETED</span>
              </div>
            )}
          </div>
        </div>

        {/* Info Area */}
        <div className="p-10 space-y-6">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <Terminal className="w-3 h-3 text-primary/40 group-hover/item:text-primary transition-colors" />
                 <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] italic group-hover/item:text-slate-600 transition-colors">{product.category}</span>
              </div>
              {product.brand && <span className="text-[9px] font-black text-slate-800 uppercase tracking-[0.4em] italic">{product.brand}</span>}
           </div>
           
           <h3 className="font-black text-slate-900 text-xl uppercase italic tracking-tighter leading-tight group-hover/item:text-primary transition-colors line-clamp-2 drop-shadow-2xl">
             {product.title}
           </h3>
        </div>
      </Link>

      {/* Price & Action Area */}
      <div className="p-10 pt-0 mt-auto flex items-center justify-between">
        <div className="space-y-2">
           <div className="text-[9px] font-black text-slate-700 uppercase tracking-[0.5em] italic">ALLOCATION COST</div>
           <div className="text-2xl font-black text-slate-900 tracking-widest italic group-hover:scale-105 transition-transform origin-left">
             {product.price ? `Rs. ${product.price.toLocaleString()}` : 'ENQUIRE'}
           </div>
        </div>
        
        {/* Direct WhatsApp Action */}
        <Link 
          href={whatsappUrl} 
          target="_blank"
          className="w-16 h-16 rounded-[1.25rem] bg-black/[0.03] border border-black/10 flex items-center justify-center text-primary hover:bg-primary hover:text-slate-900 hover:border-primary hover:shadow-[0_15px_40px_rgba(239,68,68,0.5)] transition-all duration-700 group/btn shadow-2xl"
        >
          <ShoppingCart className="w-7 h-7 transition-transform group-hover/btn:scale-110 group-hover/btn:rotate-12" />
        </Link>
      </div>

      {/* Lab UI Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    </Card>
  );
}
