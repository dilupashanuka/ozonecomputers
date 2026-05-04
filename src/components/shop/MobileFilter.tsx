"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Filter, SlidersHorizontal, Activity, Terminal } from "lucide-react";
import { ShopSidebar } from "./ShopSidebar";

export function MobileFilter({ currentCategory, categories, availableSpecs, availableBrands }: { 
  currentCategory?: string; 
  categories: any[];
  availableSpecs?: Record<string, string[]>;
  availableBrands?: string[];
}) {
  return (
    <Sheet>
      <SheetTrigger render={
        <div className="lg:hidden flex items-center gap-4 px-10 py-5 rounded-2xl bg-white/[0.03] border border-white/5 text-[11px] font-black uppercase tracking-[0.4em] text-white cursor-pointer active:scale-95 transition-all italic shadow-2xl backdrop-blur-3xl group">
          <SlidersHorizontal className="w-5 h-5 text-primary animate-pulse group-hover:scale-110 transition-transform" />
          FILTER_LAB_NODE
        </div>
      } />
      <SheetContent side="left" className="w-[340px] p-0 bg-[#050811]/95 border-white/10 overflow-y-auto custom-scrollbar backdrop-blur-3xl">
        <div className="p-10">
          <SheetHeader className="mb-16">
            <div className="flex items-center gap-4 mb-4">
               <Activity className="w-5 h-5 text-primary animate-pulse" />
               <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.5em] italic leading-none">PARAMETERS</span>
            </div>
            <SheetTitle className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-2xl">LAB <span className="text-primary italic">FILTERS</span></SheetTitle>
            <div className="flex items-center gap-3 mt-4 text-slate-800">
               <Terminal className="w-4 h-4" />
               <span className="text-[8px] font-black uppercase tracking-[0.3em] italic">READY_FOR_SCAN</span>
            </div>
          </SheetHeader>
          <ShopSidebar 
            currentCategory={currentCategory} 
            categories={categories} 
            availableSpecs={availableSpecs}
            availableBrands={availableBrands}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
