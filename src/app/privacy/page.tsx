import { Metadata } from 'next';
import { Lock, EyeOff, Activity, Terminal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Data Integrity Protocol | OZONE LABS',
  description: 'Data integrity and privacy policy for OZONE LABS. Analyze how we encrypt your personal data, secure your information architecture, and respect operator privacy.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050811] pt-56 pb-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="space-y-20">
          {/* Header */}
          <div className="space-y-10">
            <div className="flex items-center gap-6">
                <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-2xl shadow-2xl">
                   <Activity className="w-4 h-4 text-primary animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic leading-none">DATA ENCRYPTION</span>
                </div>
                <div className="w-12 h-12 rounded-[1rem] bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-700">
                   <Terminal className="w-6 h-6" />
                </div>
            </div>
            <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.8] uppercase italic drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">PRIVACY <br /><span className="text-primary italic">PROTOCOL</span></h1>
            <p className="text-xl md:text-3xl text-slate-500 font-black uppercase tracking-tight italic leading-relaxed max-w-3xl">
              YOUR DATA INTEGRITY IS PARAMOUNT. THIS PROTOCOL OUTLINES HOW OZONE LABS ENCRYPTS, UTILIZES, AND SECURES YOUR OPERATOR INFORMATION.
            </p>
          </div>

          {/* Content */}
          <div className="grid gap-10">
            <PrivacySection 
              title="1. INTEL COLLECTION"
              content="WE ANALYZE MINIMAL OPERATOR DATA REQUIRED FOR ALLOCATION PROCESSING AND ENGINEERING SUPPORT, INCLUDING NAME, SECURE EMAIL UPLINK, TELE-COMMS, AND DEPLOYMENT COORDINATES. WE DO NOT ARCHIVE FULL FINANCIAL INTEL ON OUR LOCAL SERVERS."
            />
            <PrivacySection 
              title="2. DATA UTILIZATION"
              content="YOUR INTEL IS STRICTLY UTILIZED FOR FULFILLING DEPLOYMENTS, PROVIDING TECHNICAL ENGINEERING SUPPORT, AND TRANSMITTING CRITICAL ACCOUNT OR PROTECTION UPDATES. WE NEVER COMPROMISE YOUR DATA TO EXTERNAL ENTITIES."
            />
            <PrivacySection 
              title="3. TRACKING MODULES"
              content="OUR INTERFACE UTILIZES BASIC TRACKING MODULES (COOKIES) TO ENHANCE YOUR ARCHITECTURAL EXPERIENCE, SUCH AS RETAINING YOUR BLUEPRINT ITEMS AND SESSION UPLINK. YOU CAN RECONFIGURE MODULE PREFERENCES IN YOUR INTERFACE SETTINGS."
            />
            <PrivacySection 
              title="4. SYSTEM SECURITY"
              content="WE DEPLOY INDUSTRY-STANDARD ENCRYPTION (SSL/TLS) TO PROTECT YOUR DATA DURING UPLINK. ACCESS TO OPERATOR INTEL IS RESTRICTED TO AUTHORIZED LAB PERSONNEL ONLY VIA MULTI-FACTOR AUTHENTICATION."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PrivacySection({ title, content }: { title: string, content: string }) {
  return (
    <div className="p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 space-y-6 hover:border-primary/50 transition-all duration-700 shadow-2xl group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-700">
         <Lock className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic group-hover:text-primary transition-colors leading-none">{title}</h3>
      <p className="text-slate-500 font-black uppercase tracking-tight italic leading-relaxed text-lg group-hover:text-slate-400 transition-colors">{content}</p>
    </div>
  );
}
