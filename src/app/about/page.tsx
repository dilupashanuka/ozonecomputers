import Image from 'next/image';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShieldCheck, Trophy, Target, Heart, Sparkles, ChevronRight, MessageCircle, MapPin, Globe, Activity, Zap, Terminal, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';

export const metadata: Metadata = {
  title: 'Operational History | OZONE LABS',
  description: 'Learn about the legacy of OZONE LABS. Operational across 3 strategic branches in Sri Lanka, we provide elite gaming architecture, precision workstations, and specialized tech engineering.',
  keywords: 'Ozone Labs story, about Ozone Labs, computer shop Sri Lanka, gaming PC Sri Lanka, Ozone Computers',
};

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('site_settings').select('about_text').single();

  return (
    <div className="min-h-screen bg-[#050811] pb-64 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[1200px] h-[1200px] bg-primary/5 blur-[220px] rounded-full -ml-96 -mt-96 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[1000px] h-[1000px] bg-primary/5 blur-[200px] rounded-full -mr-96 -mb-96 pointer-events-none" />

      {/* Header Area */}
      <div className="pt-64 pb-48 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl space-y-12">
             <div className="flex items-center gap-8 animate-in fade-in slide-in-from-left-12 duration-1000">
                <div className="inline-flex items-center gap-6 px-10 py-4 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-3xl shadow-[0_0_80px_rgba(239,68,68,0.3)]">
                   <Activity className="w-6 h-6 text-primary animate-pulse" />
                   <span className="text-[11px] font-black uppercase tracking-[0.6em] text-primary italic leading-none">CORE OPERATIONAL INTEL</span>
                </div>
                <div className="w-16 h-16 rounded-[1.5rem] bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-800 shadow-2xl">
                   <Terminal className="w-8 h-8" />
                </div>
             </div>
            <h1 className="text-[5rem] md:text-[11rem] font-black text-white tracking-tighter leading-[0.8] uppercase italic drop-shadow-[0_40px_100px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-bottom-12 duration-1000">
              ELITE <br /> <span className="text-primary italic">LABS</span>
            </h1>
            <div className="flex items-center gap-8 text-slate-600 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
               <Zap className="w-10 h-10 text-primary animate-pulse" />
               <p className="text-xl md:text-3xl text-slate-600 font-black uppercase tracking-tight italic leading-relaxed max-w-4xl">
                 Founded on precision engineering and high-impact performance, OZONE LABS has evolved into a tri-node network serving Sri Lanka&apos;s most demanding tech architects.
               </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 space-y-64 relative z-10">
        {/* Story Section */}
        <section className="grid lg:grid-cols-2 gap-32 items-center">
          <div className="relative aspect-square rounded-[5rem] overflow-hidden bg-white/[0.01] border border-white/5 group shadow-[0_80px_200px_rgba(0,0,0,1)] hover:border-primary/40 transition-all duration-1000">
             <Image 
              src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2042&auto=format&fit=crop" 
              alt="Premium Hardware" 
              fill 
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-30 transition-transform duration-[4000ms] group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent opacity-95" />
            <div className="absolute bottom-12 left-12 right-12 p-12 bg-white/[0.02] backdrop-blur-3xl rounded-[3.5rem] border border-white/5 shadow-2xl">
              <div className="flex items-center gap-6 mb-6">
                 <Zap className="w-6 h-6 text-primary animate-pulse" />
                 <span className="text-[11px] font-black text-primary uppercase tracking-[0.5em] italic leading-none">LAB MISSION CODE</span>
              </div>
              <p className="text-white font-black italic text-2xl md:text-4xl leading-none uppercase tracking-tighter drop-shadow-2xl">
                &quot;WE DON&apos;T JUST BUILD RIGS; WE ARCHITECT THE FUTURES OF THOSE WHO OPERATE THEM.&quot;
              </p>
            </div>
          </div>

          <div className="space-y-16">
            <div className="space-y-8">
              <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-2xl">CORE VISION</h2>
              <div className="w-48 h-3 bg-primary rounded-full shadow-[0_0_50px_rgba(239,68,68,0.8)]" />
            </div>
            <div className="space-y-12 text-slate-700 font-black uppercase tracking-tight italic text-xl md:text-2xl leading-relaxed">
              {settings?.about_text ? (
                <div className="whitespace-pre-wrap">{settings.about_text}</div>
              ) : (
                <>
                  <p className="group-hover:text-slate-500 transition-colors duration-700">
                    OZONE LABS emerged from a pure obsession with high-performance architecture. We identified a critical failure in the regional market: a lack of precision-engineered, lab-verified systems capable of handling elite gaming and mission-critical workloads.
                  </p>
                  <p className="group-hover:text-slate-500 transition-colors duration-700">
                    Starting in Deiyandara, we established the "Ozone Protocol" — a rigorous testing standard that ensures zero hardware failure. This success catalyzed our expansion into Kamburupitiya and Embilipitiya, deploying high-impact technology across the region.
                  </p>
                  <p className="group-hover:text-slate-500 transition-colors duration-700">
                    Today, we are the regional command center for tech enthusiasts. Every component is analyzed, every build is benchmarked, and every operator is supported by lifetime engineering advisory.
                  </p>
                </>
              )}
            </div>
            <div className="pt-12">
              <Link href="/products" className="group inline-flex h-28 items-center px-20 bg-primary text-white font-black uppercase tracking-[0.4em] rounded-3xl text-xs md:text-sm shadow-[0_30px_70px_rgba(239,68,68,0.5)] hover:shadow-[0_0_100px_rgba(239,68,68,0.8)] transition-all duration-700 transform hover:-translate-y-3 italic">
                INITIALIZE_INVENTORY_SCAN
                <ArrowRight className="ml-6 w-8 h-8 group-hover:translate-x-4 transition-transform duration-500" />
              </Link>
            </div>
          </div>
        </section>

        {/* Triple Presence Section */}
        <section className="space-y-32">
           <div className="text-center space-y-10">
              <h2 className="text-[5rem] md:text-[10rem] font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-2xl">TRIPLE NODES</h2>
              <div className="flex items-center justify-center gap-6 text-slate-800">
                 <Terminal className="w-8 h-8" />
                 <p className="font-black tracking-[0.6em] uppercase text-xs md:text-sm italic">OPERATIONAL ACROSS THREE STRATEGIC SECTORS</p>
              </div>
           </div>
           
           <div className="grid md:grid-cols-3 gap-14">
              <BranchCard 
                name="DEIYANDARA"
                desc="THE PRIMARY NODE. CORE LOGISTICS CENTER AND HIGH-IMPACT COMPONENT DISTRIBUTION HUB."
                code="NOD-01"
              />
              <BranchCard 
                name="KAMBURUPITIYA"
                desc="THE ENGINEERING LAB. SPECIALIZED IN WORKSTATION ARCHITECTURE AND GAMING RIG BENCHMARKING."
                code="NOD-02"
              />
              <BranchCard 
                name="EMBILIPITIYA"
                desc="THE FRONTIER NODE. BRINGING ELITE TECHNOLOGY AND MISSION-CRITICAL SERVICES TO THE REGION."
                code="NOD-03"
              />
           </div>
        </section>

        {/* Values Section */}
        <section className="grid md:grid-cols-3 gap-14">
          <ValueCard 
            icon={<Target className="w-12 h-12" />}
            title="CORE MISSION"
            desc="EMPOWERING OPERATORS WITH THE WORLD'S MOST ADVANCED COMPUTING ARCHITECTURE."
          />
          <ValueCard 
            icon={<ShieldCheck className="w-12 h-12" />}
            title="ELITE PROTOCOL"
            desc="ZERO TOLERANCE FOR SUBSTANDARD MODULES. ONLY LAB-VERIFIED HARDWARE IS DEPLOYED."
          />
          <ValueCard 
            icon={<Globe className="w-12 h-12" />}
            title="GLOBAL UPLINK"
            desc="BUILDING LONG-TERM ALLIANCES THROUGH TRANSPARENT WARRANTIES AND ELITE ENGINEERING SUPPORT."
          />
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-24 py-48 relative overflow-hidden rounded-[6rem] bg-white/[0.01] border border-white/5 shadow-[0_60px_200px_rgba(0,0,0,1)]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-30" />
          <div className="absolute inset-0 bg-primary/5 blur-[200px] rounded-full pointer-events-none" />
          
          <h2 className="text-[5rem] md:text-[13rem] font-black text-white tracking-tighter leading-none relative z-10 uppercase italic drop-shadow-2xl">READY TO <span className="text-primary italic">EVOLVE?</span></h2>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-14 w-full relative z-10 px-12">
            <Link 
              href="https://wa.me/94777539333" 
              className="group h-28 px-20 bg-primary text-white font-black uppercase tracking-[0.4em] rounded-3xl flex items-center justify-center gap-8 shadow-[0_30px_70px_rgba(239,68,68,0.5)] hover:shadow-[0_0_100px_rgba(239,68,68,0.8)] transition-all duration-700 w-full sm:w-auto text-xs md:text-sm transform hover:-translate-y-3 italic"
            >
              <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform duration-500" />
              ELITE_CONSULTATION
            </Link>
            <Link 
              href="/contact" 
              className="h-28 px-20 bg-white/[0.02] border border-white/10 text-white font-black uppercase tracking-[0.4em] rounded-3xl flex items-center justify-center hover:bg-white/[0.05] transition-all duration-700 w-full sm:w-auto text-xs md:text-sm transform hover:-translate-y-3 italic backdrop-blur-3xl shadow-2xl"
            >
              LOCATE_ACTIVE_NODE
            </Link>
          </div>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-8 opacity-20">
              <div className="w-32 h-px bg-slate-900" />
              <Zap className="w-6 h-6 text-primary animate-pulse" />
              <div className="w-32 h-px bg-slate-900" />
           </div>
        </section>
      </div>
    </div>
  );
}

function BranchCard({ name, desc, code }: { name: string, desc: string, code: string }) {
  return (
    <div className="p-16 bg-white/[0.01] rounded-[4.5rem] border border-white/5 hover:border-primary/60 transition-all duration-1000 group shadow-[0_50px_150px_rgba(0,0,0,0.8)] relative overflow-hidden hover:-translate-y-6">
       <div className="absolute top-0 right-0 p-12">
          <span className="text-[11px] font-black text-slate-800 uppercase tracking-[0.5em] italic leading-none">{code}</span>
       </div>
       <div className="flex flex-col gap-12 relative z-10">
          <div className="w-24 h-24 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-1000 shadow-2xl group-hover:shadow-[0_20px_50px_rgba(239,68,68,0.5)]">
             <MapPin className="w-10 h-10" />
          </div>
          <div className="space-y-6">
             <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none group-hover:text-primary transition-colors duration-700">{name}</h3>
             <p className="text-slate-700 font-black uppercase tracking-tight italic leading-relaxed text-sm md:text-lg group-hover:text-slate-500 transition-colors duration-700">{desc}</p>
          </div>
       </div>
       <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    </div>
  );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-20 bg-white/[0.01] rounded-[5rem] border border-white/5 hover:border-primary/60 transition-all duration-1000 space-y-12 group shadow-[0_50px_150px_rgba(0,0,0,0.8)] relative overflow-hidden hover:-translate-y-6">
      <div className="w-28 h-28 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-[1.5s] group-hover:scale-110 shadow-2xl group-hover:shadow-[0_20px_60px_rgba(239,68,68,0.6)]">
        {icon}
      </div>
      <div className="space-y-8 relative z-10">
        <h3 className="text-4xl font-black text-white tracking-tighter uppercase italic group-hover:text-primary transition-colors duration-700 leading-none">{title}</h3>
        <p className="text-slate-700 font-black uppercase tracking-tight italic leading-relaxed text-lg md:text-xl group-hover:text-slate-500 transition-colors duration-700">{desc}</p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    </div>
  );
}
