"use client"

import { useState, useCallback, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Filter, RotateCcw, ShieldCheck, ArrowLeft, LayoutGrid, Cpu, Smartphone, Monitor, Zap, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

interface ShopSidebarProps {
  currentCategory?: string;
  categories: any[];
  availableSpecs?: Record<string, string[]>;
  availableBrands?: string[];
}

export function ShopSidebar({ currentCategory, categories, availableSpecs, availableBrands }: ShopSidebarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentInventory = searchParams.get('inventory');
  
  const initialMin = Number(searchParams.get('min')) || 0;
  const initialMax = Number(searchParams.get('max')) || 1000000;
  const [priceRange, setPriceRange] = useState([initialMin, initialMax]);

  const handleSpecToggle = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentVal = params.get(`spec_${key}`);
    
    if (currentVal === value) {
      params.delete(`spec_${key}`);
    } else {
      params.set(`spec_${key}`, value);
    }
    
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const handleBrandToggle = (brand: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentVal = params.get('brand');
    
    if (currentVal === brand) {
      params.delete('brand');
    } else {
      params.set('brand', brand);
    }
    
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const inventories = [
    { id: 'workstations', name: 'Workstations', icon: <Monitor className="w-5 h-5" />, color: 'text-primary' },
    { id: 'flagships', name: 'Flagships', icon: <Smartphone className="w-5 h-5" />, color: 'text-primary' },
    { id: 'components', name: 'Components', icon: <Cpu className="w-5 h-5" />, color: 'text-primary' },
  ];

  // Debounced URL Update
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (priceRange[0] > 0) params.set('min', priceRange[0].toString());
      else params.delete('min');
      
      if (priceRange[1] < 1000000) params.set('max', priceRange[1].toString());
      else params.delete('max');

      router.push(`/products?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(timer);
  }, [priceRange, searchParams, router]);

  const handlePriceChange = (val: number | readonly number[]) => {
    if (Array.isArray(val)) {
      setPriceRange([...val]);
    }
  };

  const handlePriceReset = () => {
    setPriceRange([0, 1000000]);
  };

  const activeInv = inventories.find(i => i.id === currentInventory);
  const relevantCategories = categories?.filter(c => c.inventory_type === currentInventory && !c.parent_id) || [];

  return (
    <div className="space-y-12 sticky top-32">
      {/* Dynamic Header / Navigation */}
      <div className="space-y-8">
        {!currentInventory ? (
          <>
            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.5em] flex items-center gap-3 px-4 italic">
              <LayoutGrid className="w-4 h-4" />
              LAB INVENTORY
            </h3>
            <div className="grid gap-4">
              <Link
                href="/products"
                scroll={false}
                className={cn(
                  "flex items-center justify-between p-6 rounded-[2rem] border transition-all duration-500 group",
                  !currentCategory 
                    ? "bg-primary text-slate-900 border-primary shadow-[0_10px_30px_rgba(239,68,68,0.3)] italic"
                    : "bg-black/[0.03] border-black/5 text-slate-500 hover:border-black/20 hover:text-slate-900"
                )}
              >
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">Full Catalog Access</span>
              </Link>

              {inventories.map((inv) => (
                <Link
                  key={inv.id}
                  href={`/products?inventory=${inv.id}`}
                  scroll={false}
                  className="flex items-center gap-5 p-6 rounded-[2rem] bg-black/[0.02] border border-black/5 text-slate-500 hover:border-primary/50 hover:text-slate-900 transition-all duration-500 group"
                >
                  <div className={cn("w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:text-slate-900", inv.color)}>
                    {inv.icon}
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">{inv.name}</span>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="animate-in slide-in-from-left-8 duration-700">
            <Link 
              href="/products" 
              scroll={false}
              className="flex items-center gap-3 text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] hover:text-primary transition-all mb-8 group px-4 italic"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
              Reset Segments
            </Link>
            
            <div className="p-8 rounded-[3rem] bg-black/[0.03] border border-black/5 mb-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-[40px] pointer-events-none" />
              <div className={cn("w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-primary group-hover:text-slate-900", activeInv?.color)}>
                {activeInv?.icon}
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-1 italic">{activeInv?.name}</h3>
              <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.4em] italic">Verified Category Node</p>
            </div>

            <div className="grid gap-3">
              <Link
                href={`/products?inventory=${currentInventory}`}
                scroll={false}
                className={cn(
                  "p-5 px-8 rounded-[1.5rem] border transition-all duration-500 text-[10px] font-black uppercase tracking-[0.2em] italic",
                  !currentCategory 
                    ? "bg-primary text-slate-900 border-primary shadow-xl shadow-primary/20"
                    : "bg-black/[0.03] border-black/5 text-slate-600 hover:text-slate-900 hover:border-black/20"
                )}
              >
                All {activeInv?.name}
              </Link>
              
              {relevantCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}&inventory=${currentInventory}`}
                  scroll={false}
                  className={cn(
                    "p-5 px-8 rounded-[1.5rem] border transition-all duration-500 text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-between group italic",
                    currentCategory === cat.slug 
                      ? "bg-black/10 border-black/20 text-slate-900"
                      : "bg-black/[0.02] border-black/5 text-slate-600 hover:text-slate-900 hover:border-black/20"
                  )}
                >
                  {cat.name}
                  <div className={cn("w-1.5 h-1.5 rounded-full transition-all duration-500", currentCategory === cat.slug ? "bg-primary scale-100 shadow-[0_0_10px_rgba(239,68,68,0.8)]" : "bg-transparent scale-0")} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Premium Price Range Section */}
      <div className="space-y-10 p-10 bg-black/[0.02] rounded-[3.5rem] border border-black/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] -mr-16 -mt-16 rounded-full transition-all duration-1000 group-hover:bg-primary/10" />
        
        <div className="flex items-center justify-between relative z-10">
          <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.5em] flex items-center gap-3 italic">
            <Filter className="w-4 h-4 shadow-primary/50 shadow-sm" />
            Pricing Bounds
          </h3>
          <button 
            onClick={() => handlePriceReset()}
            className="text-[9px] font-black text-slate-700 uppercase tracking-widest hover:text-primary transition-all active:scale-90"
          >
            Reset
          </button>
        </div>

        <div className="space-y-12 relative z-10 pt-6">
          <div className="px-3">
            <Slider 
              value={priceRange} 
              max={1000000} 
              step={5000} 
              className={cn(
                "w-full",
                "[&_[data-slot=slider-track]]:bg-slate-100 [&_[data-slot=slider-track]]:h-2",
                "[&_[data-slot=slider-range]]:bg-primary [&_[data-slot=slider-range]]:shadow-[0_0_20px_rgba(239,68,68,0.5)]",
                "[&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:border-4 [&_[data-slot=slider-thumb]]:border-primary [&_[data-slot=slider-thumb]]:shadow-[0_0_30px_rgba(239,68,68,0.8)] [&_[data-slot=slider-thumb]]:size-6 [&_[data-slot=slider-thumb]]:transition-transform [&_[data-slot=slider-thumb]]:hover:scale-125"
              )}
              onValueChange={handlePriceChange}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em] px-2 italic">Low Bound</span>
              <div className="p-6 rounded-[1.5rem] bg-black/40 border border-black/5 flex flex-col group/box hover:border-primary/40 transition-all duration-500">
                <span className="text-[9px] text-primary font-black uppercase mb-2">LKR</span>
                <span className="text-xl font-black text-slate-900 group-hover/box:scale-105 transition-transform origin-left italic">
                  {priceRange[0].toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="space-y-3 text-right">
              <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em] px-2 italic">High Bound</span>
              <div className="p-6 rounded-[1.5rem] bg-black/40 border border-black/5 flex flex-col group/box hover:border-primary/40 transition-all duration-500">
                <span className="text-[9px] text-primary font-black uppercase mb-2">LKR</span>
                <span className="text-xl font-black text-slate-900 group-hover/box:scale-105 transition-transform origin-right italic">
                  {priceRange[1].toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <div className="inline-flex items-center gap-3">
               <Activity className="w-3 h-3 text-primary animate-pulse" />
               <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.4em] italic">
                 Laboratory Sync Active
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Technical Filters */}
      {((availableSpecs && Object.keys(availableSpecs).length > 0) || (availableBrands && availableBrands.length > 0)) && (
        <div className="space-y-10 p-10 bg-black/[0.02] rounded-[3.5rem] border border-black/5">
          <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.5em] flex items-center gap-3 italic">
            <Cpu className="w-4 h-4" />
            NODE DETAILS
          </h3>
          
          <div className="space-y-10">
            {availableBrands && availableBrands.length > 0 && (
              <div className="space-y-6">
                <p className="text-[10px] text-slate-700 font-black uppercase tracking-[0.4em] px-4 italic border-l-2 border-primary">Core Brands</p>
                <div className="flex flex-wrap gap-3">
                  {availableBrands.map((brand) => {
                    const isActive = searchParams.get('brand') === brand;
                    return (
                      <button
                        key={brand}
                        onClick={() => handleBrandToggle(brand)}
                        className={cn(
                          "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all duration-500 italic",
                          isActive 
                            ? "bg-primary text-slate-900 border-primary shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                            : "bg-black/5 border-black/5 text-slate-500 hover:border-primary/50 hover:text-slate-900"
                        )}
                      >
                        {brand}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {Object.entries(availableSpecs || {}).map(([key, values]) => (
              <div key={key} className="space-y-6">
                <p className="text-[10px] text-slate-700 font-black uppercase tracking-[0.4em] px-4 italic border-l-2 border-primary">{key}</p>
                <div className="flex flex-wrap gap-3">
                  {values.map((val) => {
                    const isActive = searchParams.get(`spec_${key}`) === val;
                    return (
                      <button
                        key={val}
                        onClick={() => handleSpecToggle(key, val)}
                        className={cn(
                          "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all duration-500 italic",
                          isActive 
                            ? "bg-primary text-slate-900 border-primary shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                            : "bg-black/5 border-black/5 text-slate-500 hover:border-primary/50 hover:text-slate-900"
                        )}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trust & Filters */}
      <div className="space-y-8">
        <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.5em] italic px-4">QUICK OVERRIDE</h3>
        <div className="grid gap-4">
          <Link href="/products" scroll={false} className="flex items-center justify-center gap-4 w-full h-16 rounded-[1.5rem] bg-black/[0.03] border border-black/5 text-slate-500 hover:text-slate-900 hover:border-primary transition-all duration-500 text-[10px] font-black uppercase tracking-[0.3em] group italic">
            <RotateCcw className="w-5 h-5 transition-transform group-hover:rotate-[360deg] duration-700" />
            Wipe All Filters
          </Link>
          <div className="p-10 rounded-[3rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 blur-[30px] rounded-full pointer-events-none" />
            <ShieldCheck className="w-10 h-10 text-primary mb-6 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            <h4 className="text-slate-900 font-black text-sm uppercase tracking-[0.2em] mb-2 italic">OZONE VERIFIED</h4>
            <p className="text-[10px] text-slate-500 font-bold leading-relaxed italic">
              Rigorous laboratory testing protocols ensure 100% component synergy and longevity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
