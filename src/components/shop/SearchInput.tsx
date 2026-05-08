"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import { Search, Activity, Terminal } from 'lucide-react';

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    // Reset to page 1 on new search
    params.delete('page');
    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  }, [router, searchParams]);

  return (
    <div className="relative group flex-1 sm:w-96 lg:w-[500px]">
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10">
        {isPending ? (
          <Activity className="w-6 h-6 text-primary animate-pulse" />
        ) : (
          <Terminal className="w-6 h-6 text-slate-800 group-focus-within:text-primary transition-all duration-700" />
        )}
      </div>
      <input
        type="text"
        placeholder="SCAN LABORATORY INVENTORY..."
        defaultValue={searchParams.get('search') ?? ''}
        onChange={(e) => {
          const term = e.target.value;
          const timer = setTimeout(() => handleSearch(term), 400);
          return () => clearTimeout(timer);
        }}
        className="w-full bg-black/[0.01] border border-black/5 rounded-3xl pl-20 pr-10 py-6 text-[11px] font-black uppercase tracking-[0.5em] text-slate-900 focus:outline-none focus:border-primary/60 focus:bg-black/[0.03] transition-all duration-700 italic placeholder:text-slate-800 shadow-2xl"
      />
      <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-all duration-700 translate-x-4 group-focus-within:translate-x-0">
         <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em] italic leading-none">ACTIVE SCAN</span>
         </div>
      </div>
      
      {/* Decorative Border Glow */}
      <div className="absolute inset-0 rounded-3xl bg-primary/5 blur-xl -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000" />
    </div>
  );
}
