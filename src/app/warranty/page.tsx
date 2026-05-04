import { Metadata } from 'next';
import { ShieldCheck, Clock, CheckCircle2, AlertCircle, Activity, Terminal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Protection Protocol | OZONE LABS',
  description: 'Detailed warranty protection protocol for OZONE LABS. Learn about our coverage for custom architectures, lab-verified components, and mission-critical support.',
};

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-[#050811] pt-56 pb-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="space-y-20">
          {/* Header */}
          <div className="space-y-10">
            <div className="flex items-center gap-6">
                <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-2xl shadow-2xl">
                   <Activity className="w-4 h-4 text-primary animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic leading-none">SECURITY PROTOCOL</span>
                </div>
                <div className="w-12 h-12 rounded-[1rem] bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-700">
                   <Terminal className="w-6 h-6" />
                </div>
            </div>
            <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.8] uppercase italic drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">WARRANTY <br /><span className="text-primary italic">PROTOCOL</span></h1>
            <p className="text-xl md:text-3xl text-slate-500 font-black uppercase tracking-tight italic leading-relaxed max-w-3xl">
              At OZONE LABS, we secure every deployment. Our comprehensive protection protocol ensures absolute stability and elite-level after-sales engineering.
            </p>
          </div>

          {/* Content */}
          <div className="grid gap-10">
            <PolicySection 
              title="1. CUSTOM ARCHITECTURES"
              content="ALL CUSTOM-BUILT WORKSTATIONS AND GAMING RIGS DEPLOYED FROM OZONE LABS COME WITH A MISSION-CRITICAL 3-YEAR HARDWARE PROTECTION PROTOCOL. THIS COVERS ALL LAB-VERIFIED COMPONENTS UNDER OPERATIONAL STRESS. LOGISTICS AND LABOR FOR REPLACEMENTS WITHIN THE INITIAL 12 MONTHS ARE FULLY SUBSIDIZED."
            />
            <PolicySection 
              title="2. COMPONENT MODULES"
              content="INDIVIDUAL HARDWARE MODULES (GPUS, CPUS, MOTHERBOARDS, ETC.) ARE SECURED BY THEIR RESPECTIVE GLOBAL MANUFACTURER WARRANTIES. OZONE LABS ACTS AS THE PRIMARY LIAISON FOR THE RMA PROTOCOL TO ENSURE MINIMAL DOWNTIME FOR OUR OPERATORS."
            />
            <PolicySection 
              title="3. MOBILE INFRASTRUCTURE"
              content="FLAGSHIP MOBILE DEVICES ARE SECURED BY A 1-YEAR COMPANY PROTECTION PLAN. RE-DEPLOYED OR ANALYZED DEVICES ARE COVERED BY SPECIFIC LAB-VERIFIED SHOP WARRANTIES AS DOCUMENTED AT THE POINT OF INITIAL ALLOCATION."
            />
            <PolicySection 
              title="4. SOFTWARE INTEGRITY"
              content="SOFTWARE CONFLICTS, OS INSTABILITY, OR MALWARE INFECTIONS ARE NOT COVERED UNDER HARDWARE PROTECTION PROTOCOLS. HOWEVER, OZONE LABS PROVIDES PRIORITY ENGINEERING SUPPORT AT SUBSIDIZED RATES FOR ALL REGISTERED OPERATORS."
            />
          </div>

          {/* Warranty Verification Info */}
          <div className="p-12 rounded-[4rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl space-y-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="flex items-center gap-6 text-primary relative z-10">
              <AlertCircle className="w-10 h-10 animate-pulse" />
              <h3 className="text-3xl font-black uppercase tracking-tighter italic">IMPORTANT PROTOCOL</h3>
            </div>
            <p className="text-xl text-slate-600 font-black uppercase tracking-tight italic leading-relaxed relative z-10">
              PROTECTION IS NULLIFIED IF THE &quot;OZONE LAB SEAL&quot; IS COMPROMISED, OR IF THE MODULE EXHIBITS PHYSICAL TRAUMA, LIQUID INFILTRATION, OR UNAUTHORIZED SYSTEM MODIFICATION. ALWAYS RETAIN YOUR ORIGINAL TRANSACTION INTEL FOR PROTOCOL ACTIVATION.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PolicySection({ title, content }: { title: string, content: string }) {
  return (
    <div className="p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 space-y-6 hover:border-primary/50 transition-all duration-700 shadow-2xl group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-700">
         <ShieldCheck className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic group-hover:text-primary transition-colors leading-none">{title}</h3>
      <p className="text-slate-500 font-black uppercase tracking-tight italic leading-relaxed text-lg group-hover:text-slate-400 transition-colors">{content}</p>
    </div>
  );
}
