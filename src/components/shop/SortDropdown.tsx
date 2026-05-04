"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ListFilter, Activity, Terminal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SortDropdown({ currentSort }: { currentSort: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string | null, _eventDetails: any) => {
    if (!value) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-3 px-5 py-2.5 bg-white/[0.03] border border-white/5 rounded-full hidden sm:flex shadow-2xl">
         <ListFilter className="w-3.5 h-3.5 text-primary" />
         <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] italic leading-none">PRIORITIZE_SCAN</span>
      </div>
      <Select value={currentSort || 'latest'} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[260px] h-14 bg-white/[0.02] border border-white/5 text-[11px] font-black uppercase tracking-[0.3em] text-white hover:border-primary/60 rounded-2xl focus:ring-0 focus:ring-offset-0 transition-all shadow-2xl backdrop-blur-3xl italic group">
          <SelectValue placeholder="NEWEST DEPLOYMENTS" />
        </SelectTrigger>
        <SelectContent className="bg-[#050811]/95 border border-white/10 text-white rounded-[2rem] p-3 shadow-[0_40px_100px_rgba(0,0,0,0.9)] backdrop-blur-3xl">
          <div className="px-4 py-3 mb-2 border-b border-white/5 flex items-center gap-3">
             <Terminal className="w-4 h-4 text-primary" />
             <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em] italic">RECONFIGURE SCAN</span>
          </div>
          <SelectItem value="latest" className="rounded-xl focus:bg-primary focus:text-white uppercase text-[10px] font-black tracking-[0.3em] cursor-pointer py-4 italic transition-all duration-500">NEWEST DEPLOYMENTS</SelectItem>
          <SelectItem value="oldest" className="rounded-xl focus:bg-primary focus:text-white uppercase text-[10px] font-black tracking-[0.3em] cursor-pointer py-4 italic transition-all duration-500">ARCHIVED FIRST</SelectItem>
          <SelectItem value="price-low" className="rounded-xl focus:bg-primary focus:text-white uppercase text-[10px] font-black tracking-[0.3em] cursor-pointer py-4 italic transition-all duration-500">LOW ALLOCATION (RS.)</SelectItem>
          <SelectItem value="price-high" className="rounded-xl focus:bg-primary focus:text-white uppercase text-[10px] font-black tracking-[0.3em] cursor-pointer py-4 italic transition-all duration-500">HIGH ALLOCATION (RS.)</SelectItem>
          <SelectItem value="name-az" className="rounded-xl focus:bg-primary focus:text-white uppercase text-[10px] font-black tracking-[0.3em] cursor-pointer py-4 italic transition-all duration-500">IDENTITY_CODE: A - Z</SelectItem>
          <SelectItem value="name-za" className="rounded-xl focus:bg-primary focus:text-white uppercase text-[10px] font-black tracking-[0.3em] cursor-pointer py-4 italic transition-all duration-500">IDENTITY_CODE: Z - A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
