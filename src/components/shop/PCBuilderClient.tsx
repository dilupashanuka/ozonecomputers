"use client"

import { useState, useMemo } from 'react';
import { Cpu, Monitor, HardDrive, Zap, Square, Component, LayoutGrid, CheckCircle2, ChevronRight, ChevronLeft, MessageCircle, Star, Package, X, Info, ExternalLink, Activity } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const COMPONENT_STEPS = [
  { id: 'CPU',         label: 'Processor',     icon: Cpu },
  { id: 'Motherboard', label: 'Motherboard',    icon: Square },
  { id: 'RAM',         label: 'Memory',         icon: Component },
  { id: 'GPU',         label: 'Graphics Card',  icon: Monitor },
  { id: 'Storage',     label: 'Storage',        icon: HardDrive },
  { id: 'PSU',         label: 'Power Supply',   icon: Zap },
  { id: 'Case',        label: 'Case',           icon: LayoutGrid },
];

const CAT_STYLES: Record<string, { border: string; text: string; bg: string; label: string }> = {
  gaming:      { border: 'border-primary/30',    text: 'text-primary',    bg: 'bg-primary/10',    label: 'ELITE GAMING' },
  office:      { border: 'border-cyan-500/30',   text: 'text-cyan-400',   bg: 'bg-cyan-500/10',   label: 'PRO WORK' },
  budget:      { border: 'border-slate-500/30',  text: 'text-slate-400',  bg: 'bg-slate-500/10',  label: 'LAB ENTRY' },
  workstation: { border: 'border-purple-500/30', text: 'text-purple-400', bg: 'bg-purple-500/10', label: 'ENGINEERING' },
  streaming:   { border: 'border-yellow-500/30', text: 'text-yellow-400', bg: 'bg-yellow-500/10', label: 'CONTENT HUB' },
};

interface Product {
  id: string; title: string; price: number; image_url?: string;
  brand?: string; category?: string; description?: string;
  specifications?: Record<string, string>;
}

interface BuildComponent {
  id: string; component_type: string; custom_name?: string;
  custom_price?: number; quantity: number; products?: Product;
}

interface PreBuild {
  id: string; name: string; description?: string; category: string;
  total_price: number; is_featured: boolean; image_url?: string;
  badge_text?: string; pc_build_components: BuildComponent[];
}

interface Props {
  preBuilds: PreBuild[];
  products: Product[];
  categoryMapping: Record<string, string | null>;
}

export function PCBuilderClient({ preBuilds, products, categoryMapping }: Props) {
  const [tab, setTab] = useState<'prebuilt' | 'custom'>('prebuilt');
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<Record<string, Product | null>>({});
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  const currentStep = COMPONENT_STEPS[step];
  const total = Object.values(selected).filter(Boolean).reduce((s, p) => s + (p?.price || 0), 0);
  const selectedCount = Object.values(selected).filter(Boolean).length;

  // Filter products by mapped category for current step
  const stepProducts = useMemo(() => {
    const catId = categoryMapping[currentStep.id];
    if (!catId) return products;
    return products.filter(p => p.category === catId);
  }, [products, categoryMapping, currentStep.id]);

  const mainWaNumber = '94777539333';
  const whatsappMsg = encodeURIComponent(
    `Hi OZONE Labs! Custom PC Build Quote Request:\n\n` +
    COMPONENT_STEPS.map(s => selected[s.id] ? `• ${s.label}: ${selected[s.id]!.title} — Rs. ${selected[s.id]!.price.toLocaleString()}` : null)
      .filter(Boolean).join('\n') +
    `\n\nTotal: Rs. ${total.toLocaleString()}\nPlease verify component compatibility!`
  );

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Tab Switcher */}
      <div className="flex gap-4 p-2 bg-white/[0.03] border border-white/5 rounded-[2.5rem] w-fit mx-auto mb-16 backdrop-blur-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[40px] pointer-events-none" />
        {[['prebuilt','CORE CONFIGS'],['custom','ELITE LAB CUSTOM']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key as any)}
            className={cn("px-10 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 italic",
              tab === key ? "bg-primary text-white shadow-[0_10px_40px_rgba(239,68,68,0.4)]" : "text-slate-500 hover:text-white")}>
            {label}
          </button>
        ))}
      </div>

      {/* ── READY BUILDS TAB ── */}
      {tab === 'prebuilt' && (
        preBuilds.length === 0 ? (
          <div className="py-40 flex flex-col items-center gap-8 text-center bg-white/[0.02] border border-white/5 rounded-[4rem]">
            <Package className="w-24 h-24 text-slate-800" />
            <div className="space-y-2">
               <p className="text-white font-black text-2xl uppercase tracking-tighter italic">LAB INVENTORY CLEAR</p>
               <p className="text-slate-500 font-black text-xs uppercase tracking-widest">Awaiting new system configurations</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {preBuilds.map(build => {
              const s = CAT_STYLES[build.category] || CAT_STYLES.gaming;
              return (
                <Link key={build.id} href={`/pc-builder/${build.id}`}
                  className={cn("group relative bg-white/[0.02] rounded-[3.5rem] overflow-hidden border transition-all duration-700 hover:scale-[1.03] block",
                    build.is_featured ? "border-primary/30 shadow-2xl shadow-primary/10" : "border-white/5 hover:border-primary/20")}>
                  <div className="aspect-video relative bg-[#0a0d14] overflow-hidden">
                    {build.image_url
                      ? <Image src={build.image_url} alt={build.name} fill sizes="50vw" className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80" />
                      : <div className="absolute inset-0 flex items-center justify-center"><Cpu className="w-20 h-20 text-slate-800" /></div>}
                    <div className="absolute top-6 left-6 flex gap-3 flex-wrap">
                      <span className={cn("px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-full border backdrop-blur-md", s.border, s.text, s.bg)}>{s.label}</span>
                      {build.badge_text && <span className="px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 backdrop-blur-md">{build.badge_text}</span>}
                    </div>
                    {build.is_featured && <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center shadow-lg"><Star className="w-5 h-5 text-primary fill-primary" /></div>}
                  </div>
                  <div className="p-10 space-y-8">
                    <div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic group-hover:text-primary transition-colors leading-tight">{build.name}</h3>
                      {build.description && <p className="text-sm text-slate-500 mt-3 line-clamp-2 italic">{build.description}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[9px] text-slate-600 uppercase tracking-[0.3em] font-black mb-1">Baseline Price</p>
                        <p className="text-3xl font-black text-white italic">{build.total_price ? `Rs. ${Number(build.total_price).toLocaleString()}` : 'ENQUIRE'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] text-slate-600 uppercase tracking-[0.3em] font-black mb-1">Components</p>
                        <p className="text-2xl font-black text-primary italic">{build.pc_build_components?.length || 0}</p>
                      </div>
                    </div>
                    <div className="w-full h-14 bg-white/5 border border-white/10 text-slate-400 group-hover:bg-primary group-hover:border-primary group-hover:text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-[1.5rem] transition-all duration-500 flex items-center justify-center gap-3 italic">
                      <Activity className="w-4 h-4" /> Initialize Blueprint
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )
      )}

      {/* ── CUSTOM BUILD TAB ── */}
      {tab === 'custom' && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Sticky Summary Bar */}
          <div className="sticky top-24 z-30 mb-12">
            <div className="bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-12">
                <div className="space-y-1">
                  <p className="text-[9px] text-slate-500 uppercase tracking-[0.3em] font-black">Allocation</p>
                  <p className="text-2xl font-black text-white italic">{selectedCount} / {COMPONENT_STEPS.length} NODES</p>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div className="space-y-1">
                  <p className="text-[9px] text-slate-500 uppercase tracking-[0.3em] font-black">Total Estimate</p>
                  <p className="text-2xl font-black text-primary italic">Rs. {total.toLocaleString()}</p>
                </div>
              </div>
              {selectedCount > 0 ? (
                <Link href={`https://wa.me/${mainWaNumber}?text=${whatsappMsg}`} target="_blank"
                  className="w-full md:w-auto flex items-center justify-center gap-4 px-10 py-5 bg-primary text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-primary/90 transition-all shadow-[0_0_40px_rgba(239,68,68,0.4)] transform hover:-translate-y-1 active:scale-95 italic">
                  <MessageCircle className="w-5 h-5" /> Push to Lab Engineers
                </Link>
              ) : (
                <div className="flex items-center gap-3 text-[10px] text-slate-600 font-black uppercase tracking-[0.4em] italic">
                   <Activity className="w-4 h-4 animate-pulse" />
                   Awaiting System Initialization
                </div>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left: Step Selector */}
            <div className="lg:col-span-3 space-y-3">
              {COMPONENT_STEPS.map((s, i) => (
                <button key={s.id} onClick={() => setStep(i)}
                  className={cn("w-full flex items-center justify-between p-4 rounded-[2rem] border transition-all duration-500 text-left relative overflow-hidden group",
                    i === step ? "bg-primary/10 border-primary/40 text-white shadow-xl" : "bg-white/[0.02] border-white/5 text-slate-500 hover:text-white hover:border-white/20")}>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 flex-shrink-0 shadow-lg",
                      selected[s.id] ? "bg-primary text-white shadow-primary/30" : i === step ? "bg-white text-black" : "bg-white/5 text-slate-700 group-hover:text-white")}>
                      <s.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40 italic">Module {i + 1}</p>
                      <p className="text-sm font-black uppercase tracking-tight italic">{s.label}</p>
                      {selected[s.id] && <p className="text-[10px] text-primary truncate max-w-[120px] font-bold mt-1 uppercase italic">{selected[s.id]!.title}</p>}
                    </div>
                  </div>
                  {selected[s.id] && <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 animate-in zoom-in" />}
                </button>
              ))}
            </div>

            {/* Right: Product Grid */}
            <div className="lg:col-span-9 space-y-8">
              {/* Step Header */}
              <div className="flex items-end justify-between border-b border-white/5 pb-8">
                <div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">Select {currentStep.label}</h2>
                  <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.4em] mt-3">{stepProducts.length} Compatible Units Verified</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
                    className="w-12 h-12 glass rounded-2xl border border-white/10 text-slate-500 hover:text-white disabled:opacity-30 flex items-center justify-center transition-all hover:border-primary">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={() => setStep(Math.min(COMPONENT_STEPS.length - 1, step + 1))} disabled={step === COMPONENT_STEPS.length - 1}
                    className="w-12 h-12 glass rounded-2xl border border-white/10 text-slate-500 hover:text-white disabled:opacity-30 flex items-center justify-center transition-all hover:border-primary">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Product Cards Grid */}
              {stepProducts.length === 0 ? (
                <div className="py-32 flex flex-col items-center gap-6 text-center border border-white/5 rounded-[4rem] bg-white/[0.02]">
                  <Package className="w-16 h-16 text-slate-800" />
                  <div className="space-y-1">
                     <p className="text-slate-600 font-black uppercase tracking-widest text-xs italic">Laboratory Shortage</p>
                     <p className="text-slate-700 font-bold text-[10px] uppercase tracking-[0.3em]">No units matching your blueprint</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {stepProducts.map(product => {
                    const isSelected = selected[currentStep.id]?.id === product.id;
                    return (
                      <div key={product.id}
                        className={cn("group relative rounded-[2.5rem] border transition-all duration-500 overflow-hidden",
                          isSelected ? "border-primary/60 bg-primary/5 shadow-2xl shadow-primary/20" : "border-white/5 bg-white/[0.02] hover:border-primary/30")}>
                        {/* Select Circle */}
                        <button
                          onClick={() => setSelected(prev => ({ ...prev, [currentStep.id]: isSelected ? null : product }))}
                          className={cn("absolute top-4 right-4 z-10 w-9 h-9 rounded-2xl border flex items-center justify-center transition-all duration-500",
                            isSelected ? "bg-primary border-primary rotate-12" : "bg-black/60 border-white/20 hover:border-primary/60")}
                        >
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-white" />}
                        </button>

                        {/* Info Button */}
                        <button onClick={() => setDetailProduct(product)}
                          className="absolute top-4 left-4 z-10 w-9 h-9 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-primary">
                          <Info className="w-5 h-5 text-white" />
                        </button>

                        {/* Image */}
                        <div className="aspect-square relative bg-[#0a0d14] cursor-pointer overflow-hidden" onClick={() => setDetailProduct(product)}>
                          {product.image_url
                            ? <Image src={product.image_url} alt={product.title} fill sizes="25vw" className="object-contain p-6 group-hover:scale-110 transition-transform duration-700 opacity-90" />
                            : <div className="absolute inset-0 flex items-center justify-center"><currentStep.icon className="w-16 h-16 text-slate-800" /></div>}
                        </div>

                        {/* Info */}
                        <div className="p-6">
                          {product.brand && <p className="text-[10px] text-primary font-black uppercase tracking-[0.3em] mb-1 italic">{product.brand}</p>}
                          <h3 className="text-sm font-black text-white line-clamp-2 leading-snug mb-4 cursor-pointer hover:text-primary transition-colors uppercase italic"
                            onClick={() => setDetailProduct(product)}>{product.title}</h3>
                          <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/5">
                            <p className="text-lg font-black text-white italic tracking-tighter">Rs. {product.price ? Number(product.price).toLocaleString() : '—'}</p>
                            <button
                              onClick={() => setSelected(prev => ({ ...prev, [currentStep.id]: isSelected ? null : product }))}
                              className={cn("text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2.5 rounded-xl transition-all duration-500",
                                isSelected ? "bg-primary text-white" : "bg-white/5 text-slate-500 hover:bg-primary hover:text-white")}>
                              {isSelected ? 'LOCKED' : 'PICK'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── PRODUCT DETAIL MODAL ── */}
      {detailProduct && (
        <div className="fixed inset-0 z-[2001] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-500" onClick={() => setDetailProduct(null)} />
          <div className="relative w-full max-w-3xl bg-[#080b11] border border-white/10 rounded-[4rem] overflow-hidden shadow-[0_50px_150px_rgba(0,0,0,1)] animate-in fade-in zoom-in-95 duration-500 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button onClick={() => setDetailProduct(null)}
              className="absolute top-8 right-8 z-20 w-14 h-14 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary transition-all duration-500 group">
              <X className="w-7 h-7 group-hover:rotate-90 transition-transform" />
            </button>
            <div className="aspect-video relative bg-[#0a0d14] overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] to-transparent z-10" />
              {detailProduct.image_url
                ? <Image src={detailProduct.image_url} alt={detailProduct.title} fill className="object-contain p-12 opacity-90" />
                : <div className="absolute inset-0 flex items-center justify-center"><Cpu className="w-32 h-32 text-slate-800" /></div>}
            </div>
            <div className="p-12 space-y-8 relative z-10">
              <div className="space-y-2">
                 {detailProduct.brand && <p className="text-[10px] text-primary font-black uppercase tracking-[0.5em] italic">{detailProduct.brand}</p>}
                 <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic leading-none">{detailProduct.title}</h2>
              </div>
              <p className="text-5xl font-black text-white italic tracking-tighter">Rs. {Number(detailProduct.price).toLocaleString()}</p>
              {detailProduct.description && <p className="text-slate-500 text-lg leading-relaxed italic">{detailProduct.description}</p>}
              
              {detailProduct.specifications && Object.keys(detailProduct.specifications).length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="h-px flex-1 bg-white/10" />
                     <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.5em] italic">Laboratory Report</p>
                     <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(detailProduct.specifications).slice(0, 10).map(([k, v]) => (
                      <div key={k} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-primary/30 transition-all">
                        <p className="text-[9px] text-slate-600 uppercase tracking-widest font-black mb-1 group-hover:text-primary transition-colors">{k}</p>
                        <p className="text-base font-black text-white italic uppercase tracking-tight">{v as string}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <button
                onClick={() => { setSelected(prev => ({ ...prev, [currentStep.id]: detailProduct })); setDetailProduct(null); }}
                className="w-full h-20 bg-primary text-white font-black uppercase tracking-[0.3em] rounded-[2rem] hover:bg-primary/90 transition-all duration-500 shadow-2xl shadow-primary/20 transform hover:-translate-y-1 active:scale-95 italic">
                Commit to System
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
