"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, Activity, Terminal } from 'lucide-react';

const WISHLIST_KEY = 'ozone-labs-blueprint';

export function WishlistNavButton() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  const syncCount = () => {
    try {
      const ids: string[] = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
      setCount(ids.length);
    } catch {
      setCount(0);
    }
  };

  useEffect(() => {
    setMounted(true);
    syncCount();
    window.addEventListener('wishlist-change', syncCount);
    return () => window.removeEventListener('wishlist-change', syncCount);
  }, []);

  if (!mounted) return null;

  return (
    <Link
      href="/wishlist"
      className="relative w-16 h-16 rounded-[1.25rem] bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-800 hover:text-primary hover:bg-primary/10 hover:border-primary/40 transition-all duration-700 group shadow-2xl"
      title="LAB BLUEPRINT ARCHIVE"
    >
      <Heart className={`w-7 h-7 transition-all duration-700 group-hover:scale-110 ${count > 0 ? 'fill-primary text-primary drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]' : ''}`} />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 min-w-[24px] h-[24px] rounded-full bg-primary text-white text-[11px] font-black flex items-center justify-center px-1.5 shadow-[0_10px_30px_rgba(239,68,68,0.8)] animate-in zoom-in duration-700 italic border-2 border-[#050811]">
          {count > 9 ? '9+' : count}
        </span>
      )}
      {count > 0 && (
         <div className="absolute -bottom-2 -left-2">
            <Activity className="w-4 h-4 text-primary animate-pulse" />
         </div>
      )}
    </Link>
  );
}
