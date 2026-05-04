import { Metadata } from 'next';
import { Scale, FileText, Activity, Terminal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Operational Terms | OZONE LABS',
  description: 'Operational terms and conditions for OZONE LABS. Analyze our sales protocols, operator responsibilities, and legal frameworks.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050811] pt-56 pb-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="space-y-20">
          {/* Header */}
          <div className="space-y-10">
            <div className="flex items-center gap-6">
                <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-2xl shadow-2xl">
                   <Activity className="w-4 h-4 text-primary animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic leading-none">LEGAL FRAMEWORK</span>
                </div>
                <div className="w-12 h-12 rounded-[1rem] bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-700">
                   <Terminal className="w-6 h-6" />
                </div>
            </div>
            <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.8] uppercase italic drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">TERMS & <br /><span className="text-primary italic">PROTOCOLS</span></h1>
            <p className="text-xl md:text-3xl text-slate-500 font-black uppercase tracking-tight italic leading-relaxed max-w-3xl">
              BY ACCESSING AND UTILIZING THE OZONE LABS NETWORK AND SERVICES, YOU AGREE TO COMPLY WITH THE FOLLOWING OPERATIONAL PROTOCOLS AND LEGAL FRAMEWORKS.
            </p>
          </div>

          {/* Content */}
          <div className="grid gap-10">
            <TermSection 
              title="1. ALLOCATION & TRANSACTIONS"
              content="ALL ALLOCATIONS PLACED THROUGH THE OZONE NETWORK ARE SUBJECT TO MODULE AVAILABILITY. TRANSACTIONS MUST BE COMPLETED IN FULL BEFORE DEPLOYMENT UNLESS A SPECIFIC CREDIT ALLIANCE EXISTS. WE AUTHORIZE BANK TRANSFERS, DIRECT DEPOSITS, AND ELITE INSTALLMENT PROTOCOLS."
            />
            <TermSection 
              title="2. PRICING ARCHITECTURE"
              content="WHILE WE MAINTAIN MAXIMUM ACCURACY IN OUR DATA STREAMS, TECHNICAL ERRORS IN PRICING ARCHITECTURE MAY OCCUR. OZONE LABS RESERVES THE RIGHT TO NEUTRALIZE ALLOCATIONS PLACED WITH INCORRECT PRICING DUE TO SYSTEM GLITCHES OR EXTERNAL DATA CORRUPTION."
            />
            <TermSection 
              title="3. DEPLOYMENT LOGISTICS"
              content="STANDARD DEPLOYMENT WINDOWS ARE BETWEEN 24-48 OPERATIONAL HOURS WITHIN THE SRI LANKAN SECTOR. ANY LATENCY DUE TO EXTERNAL LOGISTICS NODES IS BEYOND LAB CONTROL, BUT WE WILL ASSIST IN TRACKING AND RESOLVING ALL UPLINK ISSUES."
            />
            <TermSection 
              title="4. ARCHIVE & RETURNS"
              content="HARDWARE ARCHIVING (RETURNS) IS ONLY AUTHORIZED WITHIN 168 HOURS OF INITIAL ALLOCATION IF THE MODULE REMAINS IN ITS ORIGINAL, UNCOMPROMISED PACKAGING. A RE-INTEGRATION FEE MAY APPLY FOR ACCESSED MODULES THAT ARE NOT TECHNICALLY DEFICIENT."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TermSection({ title, content }: { title: string, content: string }) {
  return (
    <div className="p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 space-y-6 hover:border-primary/50 transition-all duration-700 shadow-2xl group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-700">
         <FileText className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic group-hover:text-primary transition-colors leading-none">{title}</h3>
      <p className="text-slate-500 font-black uppercase tracking-tight italic leading-relaxed text-lg group-hover:text-slate-400 transition-colors">{content}</p>
    </div>
  );
}
