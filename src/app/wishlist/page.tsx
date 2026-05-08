"use client"

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { ProductCard } from '@/components/shop/ProductCard';
import { Heart, ShoppingCart, ArrowLeft, Activity, Terminal, Zap } from 'lucide-react';
import Link from 'next/link';

const WISHLIST_KEY = 'ozone-computers-wishlist';

export default function WishlistPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const ids: string[] = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
        if (ids.length === 0) {
          setLoading(false);
          setProducts([]);
          return;
        }
        const supabase = createClient();
        const { data } = await supabase
          .from('products')
          .select('*')
          .in('id', ids);
        
        setProducts((data || []).map(p => ({
          ...p,
          title: p.name,
          image_url: p.image
        })));
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();

    const onWishlistChange = () => loadWishlist();
    window.addEventListener('wishlist-change', onWishlistChange);
    return () => window.removeEventListener('wishlist-change', onWishlistChange);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 pt-48 pb-64 px-6 relative overflow-hidden">
       {/* Background Ambience */}
       <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/5 blur-[200px] rounded-full -mr-96 -mt-96 pointer-events-none" />
       <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full -ml-48 -mb-48 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-14 mb-32 border-b border-black/5 pb-24 relative">
          <div className="absolute -top-12 left-0 text-[10px] font-black text-slate-800 uppercase tracking-[0.5em] italic">LAB_SECTOR_ARCHIVE</div>
          
          <Link 
            href="/products"
            className="w-20 h-20 flex items-center justify-center bg-black/[0.02] rounded-[1.5rem] border border-black/5 text-slate-700 hover:text-primary hover:border-primary/50 transition-all duration-700 group shadow-2xl"
          >
            <ArrowLeft className="w-8 h-8 group-hover:-translate-x-2 transition-transform duration-500" />
          </Link>
          <div className="space-y-8 flex-1">
            <div className="flex items-center gap-6">
               <div className="px-8 py-3 rounded-full bg-primary/10 border border-primary/20 flex items-center gap-4 shadow-[0_0_50px_rgba(239,68,68,0.3)]">
                  <Activity className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-[11px] font-black uppercase tracking-[0.5em] text-primary italic leading-none">SECURE_BLUEPRINT_VAULT</span>
               </div>
               <Terminal className="w-6 h-6 text-slate-800" />
            </div>
            <h1 className="text-6xl md:text-[7rem] font-black text-slate-900 uppercase italic tracking-tighter leading-[0.8] drop-shadow-2xl">
              LAB <span className="text-primary italic">ARCHIVE</span>
            </h1>
            <div className="flex items-center gap-6 text-slate-600">
               <Zap className="w-4 h-4 text-primary animate-pulse" />
               <p className="text-xs font-black uppercase tracking-[0.4em] italic leading-none">
                 {loading ? 'SYNCHRONIZING_DATA...' : `${products.length} COMPONENT_ENTRIES_ALLOCATED`}
               </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square rounded-[4rem] bg-black/[0.01] border border-black/5 animate-pulse" />
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  title: product.title,
                  description: product.description,
                  category: product.category,
                  price: product.price,
                  image_url: product.image_url,
                  in_stock: product.in_stock,
                  specifications: product.specifications,
                  brand: product.brand,
                }}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-56 gap-14 text-center bg-black/[0.01] rounded-[6rem] border-2 border-dashed border-black/5 group shadow-[0_50px_150px_rgba(0,0,0,0.9)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="w-40 h-40 rounded-[2.5rem] bg-black/[0.02] border border-black/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/40 transition-all duration-1000 shadow-2xl relative z-10">
              <Heart className="w-16 h-16 text-slate-800 group-hover:text-primary transition-all duration-1000 transform group-hover:scale-110" />
            </div>
            <div className="space-y-6 relative z-10">
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter italic leading-none drop-shadow-2xl">
                VAULT <span className="text-primary italic">VACANT</span>
              </h2>
              <div className="flex items-center justify-center gap-4 text-slate-800">
                 <Terminal className="w-5 h-5" />
                 <p className="text-[11px] font-black uppercase tracking-[0.5em] italic max-w-sm leading-relaxed">
                   NO COMPONENT DATA DETECTED. INITIALIZE SCAN TO ALLOCATE ITEMS TO ARCHIVE.
                 </p>
              </div>
            </div>
            <Link 
              href="/products"
              className="flex items-center gap-6 px-12 py-8 bg-primary text-slate-900 font-black uppercase tracking-[0.4em] text-xs rounded-3xl hover:bg-primary/90 transition-all shadow-[0_30px_70px_rgba(239,68,68,0.5)] transform hover:-translate-y-3 italic relative z-10"
            >
              <ShoppingCart className="w-6 h-6" />
              START_COMPONENT_SCAN
            </Link>
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 text-slate-900 opacity-20">
               <div className="w-16 h-px bg-slate-100" />
               <Zap className="w-4 h-4 animate-pulse" />
               <div className="w-16 h-px bg-slate-100" />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
