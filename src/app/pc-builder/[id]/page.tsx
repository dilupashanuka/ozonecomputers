import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, ArrowLeft, Star, Cpu, CheckCircle2, Package, Activity, Zap, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';

const CAT_STYLES: Record<string, { border: string; text: string; bg: string; label: string }> = {
  gaming:      { border: 'border-primary/30',    text: 'text-primary',    bg: 'bg-primary/10',    label: 'ELITE GAMING' },
  office:      { border: 'border-cyan-500/30',   text: 'text-cyan-400',   bg: 'bg-cyan-500/10',   label: 'PRO WORK' },
  budget:      { border: 'border-slate-500/30',  text: 'text-slate-400',  bg: 'bg-slate-500/10',  label: 'LAB ENTRY' },
  workstation: { border: 'border-purple-500/30', text: 'text-purple-400', bg: 'bg-purple-500/10', label: 'ENGINEERING' },
  streaming:   { border: 'border-yellow-500/30', text: 'text-yellow-400', bg: 'bg-yellow-500/10', label: 'CONTENT HUB' },
};

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: build } = await supabase.from('pc_builds').select('name, description').eq('id', id).single();
  
  if (!build) return { title: 'Build Not Found | OZONE Computers' };
  
  return {
    title: `${build.name} | OZONE Computers Lab`,
    description: build.description || `Explore the ${build.name} custom PC build from OZONE Computers.`,
  };
}

export default async function PreBuildDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: build } = await supabase
    .from('pc_builds')
    .select(`
      *,
      pc_build_components(
        id, component_type, custom_name, custom_price, quantity,
        products(*)
      )
    `)
    .eq('id', id)
    .eq('is_active', true)
    .single();

  if (!build) notFound();

  const style = CAT_STYLES[build.category] || CAT_STYLES.gaming;
  const mainWaNumber = '94777539333';

  const whatsappMsg = encodeURIComponent(
    `Hi OZONE Labs! I'd like to order the "${build.name}" pre-built configuration.\n\n` +
    `💰 Base Price: Rs. ${Number(build.total_price).toLocaleString()}\n` +
    `🖥️ Category: ${build.category}\n\n` +
    `Lab Verified Components:\n` +
    build.pc_build_components
      ?.map((c: any) => `• ${c.component_type}: ${c.products?.name || c.custom_name || 'TBD'}`)
      .join('\n') +
    `\n\nPlease confirm availability at the labs!`
  );

  const components = build.pc_build_components || [];

  return (
    <main className="min-h-screen bg-[#080b11] pt-32 pb-32 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] -mr-[300px] -mt-[300px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] -ml-[200px] -mb-[200px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Back button */}
        <Link href="/pc-builder" className="inline-flex items-center gap-3 text-slate-600 hover:text-white transition-all mb-12 text-[10px] font-black uppercase tracking-[0.4em] italic group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" /> Back to Lab Blueprint
        </Link>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left: Hero Image + Quick Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="aspect-square relative bg-[#0a0d14] rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl group">
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] to-transparent z-10 opacity-60" />
              {build.image_url ? (
                <Image src={build.image_url} alt={build.name} fill sizes="40vw" className="object-cover group-hover:scale-110 transition-transform duration-[2s] opacity-90" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Cpu className="w-32 h-32 text-slate-800" />
                </div>
              )}
              {build.is_featured && (
                <div className="absolute top-8 right-8 z-20 flex items-center gap-2 px-5 py-2.5 bg-yellow-400/10 border border-yellow-400/30 rounded-full backdrop-blur-md shadow-xl">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-[10px] font-black text-yellow-400 uppercase tracking-[0.2em] italic">LAB CERTIFIED</span>
                </div>
              )}
            </div>

            {/* Price Card */}
            <div className="p-10 bg-white/[0.02] border border-white/10 rounded-[3rem] space-y-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[40px] pointer-events-none" />
              <div>
                <p className="text-[10px] text-primary font-black uppercase tracking-[0.5em] mb-3 italic">Investment Value</p>
                <p className="text-6xl font-black text-white italic tracking-tighter">
                  {build.total_price ? `Rs. ${Number(build.total_price).toLocaleString()}` : 'ENQUIRE'}
                </p>
                <p className="text-[10px] text-slate-600 mt-4 uppercase tracking-[0.3em] font-black italic">{components.length} Laboratory-Matched Components</p>
              </div>
              <Link
                href={`https://wa.me/${mainWaNumber}?text=${whatsappMsg}`}
                target="_blank"
                className="flex items-center justify-center gap-4 w-full h-20 bg-primary text-white font-black uppercase tracking-[0.3em] text-xs rounded-2xl hover:bg-primary/90 transition-all shadow-[0_15px_50px_rgba(239,68,68,0.3)] transform hover:-translate-y-1 italic"
              >
                <MessageCircle className="w-6 h-6" /> Deploy Blueprint
              </Link>
              <div className="flex items-center justify-center gap-3 text-[9px] text-slate-700 uppercase tracking-[0.4em] font-black italic">
                 <Activity className="w-3 h-3 text-primary animate-pulse" />
                 Global Lab Availability Pending
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-3 space-y-12">
            {/* Header */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 flex-wrap">
                <span className={cn("px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] rounded-full border backdrop-blur-md italic", style.border, style.text, style.bg)}>
                  {style.label}
                </span>
                {build.badge_text && (
                  <span className="px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 backdrop-blur-md italic">
                    {build.badge_text}
                  </span>
                )}
              </div>
              <h1 className="text-6xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.8] mb-6 italic">
                {build.name}
              </h1>
              {build.description && (
                <p className="text-slate-500 text-xl leading-relaxed italic max-w-2xl">{build.description}</p>
              )}
            </div>

            {/* Components List */}
            {components.length > 0 ? (
              <div className="space-y-8">
                 <div className="flex items-center gap-6">
                   <h2 className="text-[10px] text-primary font-black uppercase tracking-[0.5em] italic flex-shrink-0">
                     System Architecture
                   </h2>
                   <div className="h-px w-full bg-white/5" />
                 </div>
                <div className="space-y-4">
                  {components.map((comp: any) => {
                    const product = comp.products;
                    const name = product?.title || comp.custom_name || 'TBD';
                    const price = product?.price || comp.custom_price || 0;
                    const total = price * comp.quantity;

                    return (
                      <div key={comp.id} className="group bg-white/[0.02] border border-white/5 hover:border-primary/40 rounded-[2.5rem] p-6 transition-all duration-500">
                        <div className="flex gap-6 items-center">
                          {/* Component Image */}
                          <div className="w-20 h-20 flex-shrink-0 rounded-3xl bg-[#0a0d14] border border-white/5 overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
                            {product?.image_url ? (
                              <Image src={product.image_url} alt={name} fill sizes="80px" className="object-contain p-3 opacity-80 group-hover:opacity-100" />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Cpu className="w-10 h-10 text-slate-800" />
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-6">
                              <div>
                                <p className="text-[9px] text-primary font-black uppercase tracking-[0.4em] mb-1 italic">
                                  {comp.component_type}{comp.quantity > 1 ? ` × ${comp.quantity}` : ''}
                                </p>
                                <p className="text-lg font-black text-white leading-none uppercase italic tracking-tight group-hover:text-primary transition-colors">{name}</p>
                                {product?.brand && (
                                  <p className="text-[10px] text-slate-600 mt-2 font-black uppercase tracking-widest">{product.brand}</p>
                                )}
                              </div>
                              <p className="text-xl font-black text-white italic tracking-tighter">
                                Rs. {Number(total).toLocaleString()}
                              </p>
                            </div>

                            {/* Specs chips */}
                            {product?.specifications && Object.keys(product.specifications).length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-4">
                                {Object.entries(product.specifications).slice(0, 4).map(([k, v]) => (
                                  <span key={k} className="px-3 py-1 text-[9px] font-black text-slate-500 bg-white/5 border border-white/5 rounded-full uppercase italic tracking-wider">
                                    {k}: {String(v)}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="py-24 flex flex-col items-center gap-6 text-center border border-white/5 rounded-[4rem] bg-white/[0.01]">
                <Package className="w-16 h-16 text-slate-800" />
                <p className="text-[10px] text-slate-700 font-black uppercase tracking-[0.4em] italic">Awaiting Component Serialization</p>
              </div>
            )}

            {/* Why OZONE Labs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <Zap className="w-6 h-6 text-primary" />, label: 'RAPID ASSEMBLY', desc: '4-Hour Lab Turnaround' },
                { icon: <ShieldAlert className="w-6 h-6 text-primary" />, label: 'OZONE WARRANTY', desc: 'Direct Tech Coverage' },
                { icon: <Activity className="w-6 h-6 text-primary" />, label: 'ELITE TUNING', desc: 'Maximized Frame Output' },
              ].map(item => (
                <div key={item.label} className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] group hover:border-primary/40 transition-all duration-500">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                  <p className="text-xs font-black text-white uppercase tracking-[0.2em] italic mb-1">{item.label}</p>
                  <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.1em]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
