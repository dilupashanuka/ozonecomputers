import { createClient } from '@/utils/supabase/server';
import { Settings, Smartphone, PenTool as Tool, Truck, Headphones, Monitor, Cpu, ShieldAlert, Sparkles, MessageCircle, ChevronRight, Zap, Activity, ShieldCheck, Terminal } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lab Services | OZONE COMPUTERS',
  description: 'Elite technical services including high-impact hardware repairs, precision PC building, and advanced security infrastructure.',
  keywords: 'OZONE services, computer repair Sri Lanka, CCTV installation, gaming PC support',
};

export const revalidate = 0;

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data: services } = await supabase.from('services').select('*').order('created_at', { ascending: true });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'settings': return <Settings className="w-12 h-12" />;
      case 'smartphone': return <Smartphone className="w-12 h-12" />;
      case 'tool': return <Tool className="w-12 h-12" />;
      case 'truck': return <Truck className="w-12 h-12" />;
      case 'headphones': return <Headphones className="w-12 h-12" />;
      case 'monitor': return <Monitor className="w-12 h-12" />;
      default: return <Cpu className="w-12 h-12" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-64 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-primary/5 blur-[220px] rounded-full -mr-96 -mt-96 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-primary/5 blur-[180px] rounded-full -ml-48 -mb-48 pointer-events-none" />

      {/* Header Area */}
      <div className="pt-64 pb-48 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl space-y-12">
             <div className="inline-flex items-center gap-6 px-10 py-4 rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_80px_rgba(239,68,68,0.3)]">
              <Zap className="w-6 h-6 text-primary animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-[0.6em] text-primary italic leading-none">TECHNICAL PROTOCOLS ACTIVE</span>
            </div>
            <h1 className="text-[5rem] md:text-[10rem] font-black text-slate-900 tracking-tighter leading-[0.8] uppercase italic drop-shadow-2xl">
              ELITE <br /> <span className="text-primary italic">ENGINEERING</span>
            </h1>
            <div className="flex items-center gap-8 text-slate-600">
               <Terminal className="w-10 h-10" />
               <p className="text-sm md:text-2xl text-slate-600 font-black uppercase tracking-tight italic leading-relaxed max-w-3xl">
                 High-impact technical support for elite hardware architecture. 
                 Precision calibration, advanced repairs, and infrastructure deployment.
               </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
          {services && services.length > 0 ? (
            services.map((service, idx) => (
              <div key={service.id} className="group p-16 bg-black/[0.01] rounded-[4.5rem] border border-black/5 hover:border-primary/60 transition-all duration-1000 relative overflow-hidden shadow-[0_50px_150px_rgba(0,0,0,0.8)] hover:-translate-y-6">
                <div className="absolute top-0 right-0 w-56 h-56 bg-primary/5 blur-[100px] group-hover:bg-primary/15 transition-all duration-1000" />
                
                <div className="relative z-10 space-y-10">
                  <div className="w-24 h-24 rounded-[2rem] bg-black/[0.02] border border-black/5 flex items-center justify-center text-primary transition-all duration-1000 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-primary group-hover:text-slate-900 group-hover:shadow-[0_25px_60px_rgba(239,68,68,0.6)]">
                    {getIcon(service.icon || 'settings')}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic group-hover:text-primary transition-colors duration-700">
                      {service.title}
                    </h3>
                    {service.price_range && (
                      <div className="flex items-center gap-4">
                         <div className="h-px w-10 bg-primary/40" />
                         <span className="text-[11px] font-black text-slate-800 uppercase tracking-[0.4em] italic leading-none">
                           EST_VAL: {service.price_range}
                         </span>
                      </div>
                    )}
                  </div>

                  <p className="text-slate-700 font-black text-sm md:text-lg uppercase tracking-tight italic leading-relaxed line-clamp-4 group-hover:text-slate-500 transition-colors duration-700">
                    {service.description}
                  </p>

                  <div className="pt-12 border-t border-black/5">
                    <Link 
                      href={`https://wa.me/94777539333?text=Hi OZONE Labs! I'm interested in: ${service.title}`}
                      target="_blank"
                      className="flex items-center justify-between w-full p-8 bg-black/[0.02] border border-black/5 rounded-3xl text-[11px] font-black uppercase tracking-[0.4em] text-slate-900 hover:bg-primary hover:border-primary transition-all duration-700 italic shadow-2xl"
                    >
                      INITIALIZE_INTEL
                      <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
             <div className="col-span-full py-64 text-center bg-black/[0.01] rounded-[6rem] border-2 border-dashed border-black/5 group shadow-[0_50px_150px_rgba(0,0,0,0.9)]">
                 <div className="w-32 h-32 rounded-[2rem] bg-black/[0.02] border border-black/5 flex items-center justify-center mx-auto mb-12 group-hover:bg-primary/10 transition-all duration-1000">
                    <Terminal className="w-14 h-14 text-slate-900 group-hover:text-primary transition-colors" />
                 </div>
                <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic mb-6">LAB SERVICES OFFLINE</h2>
                <div className="flex items-center justify-center gap-6 text-slate-900">
                   <Activity className="w-5 h-5 animate-pulse" />
                   <p className="text-[11px] font-black uppercase tracking-[0.4em] italic leading-none">SYNCHRONIZATION_PENDING_PROTOCOL</p>
                </div>
             </div>
          )}
        </div>

        {/* Support CTA */}
        <div className="mt-64 relative p-20 md:p-40 rounded-[6rem] overflow-hidden border border-black/5 shadow-[0_60px_200px_rgba(0,0,0,1)] bg-black/[0.01]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
          <div className="absolute -top-32 -right-32 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[180px] animate-pulse" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-24">
            <div className="max-w-3xl space-y-12 text-center lg:text-left">
               <div className="inline-flex items-center gap-6 px-10 py-4 rounded-full bg-black/[0.02] border border-black/10 italic shadow-2xl">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <span className="text-[11px] font-black text-slate-900 uppercase tracking-[0.5em] leading-none">ELITE SOLUTION PROTOCOL</span>
               </div>
              <h2 className="text-6xl md:text-[6rem] font-black text-slate-900 tracking-tighter leading-[0.8] uppercase italic drop-shadow-2xl">BESPOKE LAB <br /> <span className="text-primary italic">SYSTEMS?</span></h2>
              <p className="text-sm md:text-2xl text-slate-600 font-black uppercase tracking-tight italic leading-relaxed">
                Our lead engineers architect bespoke infrastructure for high-demand environments. 
                From specialized GPU servers to advanced automation.
              </p>
            </div>
            <Link 
              href="https://wa.me/94777539333" 
              className="h-24 px-16 md:h-28 md:px-20 bg-primary text-slate-900 font-black uppercase tracking-[0.4em] rounded-[2.5rem] text-xs md:text-sm shadow-[0_30px_70px_rgba(239,68,68,0.5)] flex items-center gap-6 hover:shadow-[0_0_100px_rgba(239,68,68,0.8)] transition-all duration-700 justify-center w-full lg:w-auto transform hover:-translate-y-3 italic group"
            >
              <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
              TALK_TO_LEAD_ENGINEER
            </Link>
          </div>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-20 group-hover:opacity-100 transition-opacity duration-1000">
              <div className="w-32 h-px bg-slate-100" />
              <Zap className="w-6 h-6 text-primary animate-pulse" />
              <div className="w-32 h-px bg-slate-100" />
           </div>
        </div>
      </div>
    </div>
  );
}
