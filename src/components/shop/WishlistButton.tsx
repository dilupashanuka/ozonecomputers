"use client"

import { useEffect, useState, useCallback } from 'react';
import { Heart, Activity, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

const WISHLIST_KEY = 'ozone-labs-blueprint';

function getWishlist(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
  } catch {
    return [];
  }
}

export function WishlistButton({ productId, size = 'sm' }: { productId: string; size?: 'sm' | 'lg' }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsWishlisted(getWishlist().includes(productId));
  }, [productId]);

  const toggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const current = getWishlist();
    const next = current.includes(productId)
      ? current.filter(id => id !== productId)
      : [...current, productId];
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
    setIsWishlisted(next.includes(productId));
    // Dispatch a storage event so other components can react
    window.dispatchEvent(new Event('wishlist-change'));
  }, [productId]);

  if (!mounted) {
    return (
      <button
        aria-label="Save to Blueprint"
        className={cn(
          "flex items-center justify-center transition-all duration-700",
          size === 'lg' 
            ? "h-24 w-24 bg-black/[0.03] rounded-2xl border border-black/5 text-slate-800 shadow-2xl"
            : "w-14 h-14 bg-black/60 backdrop-blur-3xl rounded-[1.25rem] border border-black/10 text-slate-800"
        )}
      >
        <Heart className={size === 'lg' ? "w-8 h-8" : "w-6 h-6"} />
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={isWishlisted ? "Archive Intel" : "Capture Intel"}
      title={isWishlisted ? "ARCHIVE INTEL" : "CAPTURE INTEL"}
      className={cn(
        "flex items-center justify-center transition-all duration-700 relative overflow-hidden group/wish",
        size === 'lg' 
          ? `h-24 w-24 rounded-2xl border-2 backdrop-blur-3xl shadow-2xl ${
              isWishlisted 
                ? 'border-primary bg-primary/20 text-primary shadow-[0_0_50px_rgba(239,68,68,0.5)]' 
                : 'border-black/5 bg-black/[0.01] text-slate-800 hover:text-primary hover:border-primary/50'
            }`
          : `w-14 h-14 rounded-[1.25rem] backdrop-blur-3xl transition-all duration-700 border-2 ${
              isWishlisted 
                ? 'bg-primary/20 text-primary border-primary shadow-[0_0_30px_rgba(239,68,68,0.4)] opacity-100' 
                : 'bg-black/80 border-black/5 text-slate-800 hover:text-primary hover:border-primary/50 opacity-0 group-hover:opacity-100'
            }`
      )}
    >
      <Heart className={cn(
        "transition-all duration-700",
        size === 'lg' ? "w-8 h-8" : "w-6 h-6",
        isWishlisted ? "fill-primary scale-110" : "group-hover/wish:scale-110"
      )} />
      {isWishlisted && (
         <div className="absolute top-0 right-0 p-1">
            <Activity className="w-2.5 h-2.5 text-primary animate-pulse" />
         </div>
      )}
    </button>
  );
}
