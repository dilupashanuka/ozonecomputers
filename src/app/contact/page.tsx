import { MapPin, Phone, Mail, Clock, MessageCircle, Sparkles, Send, Globe, ChevronRight, Activity, Terminal, Zap } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title: 'Operational Support | OZONE LABS',
  description: 'Connect with the OZONE LABS support network. Visit any of our three strategic nodes in Deiyandara, Kamburupitiya, or Embilipitiya for elite tech engineering.',
  keywords: 'contact Ozone Labs, computer shop Kamburupitiya, tech support Embilipitiya, pc repair Deiyandara, Ozone Computers',
};

const BRANCH_LOCATIONS = [
  {
    name: "DEIYANDARA NODE",
    phone: "077 753 9333",
    address: "DEIYANDARA, SRI LANKA",
    code: "NOD-01",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15873.344605929424!2d80.58434775!3d6.08523315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae1468165d78575%3A0x633e7f4c34a2e55a!2sDeiyandara!5e0!3m2!1sen!2slk!4v1714647300000!5m2!1sen!2slk"
  },
  {
    name: "KAMBURUPITIYA NODE",
    phone: "076 990 9333",
    address: "KAMBURUPITIYA, SRI LANKA",
    code: "NOD-02",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15874.123!2d80.567!3d6.067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae1442!2sKamburupitiya!5e0!3m2!1sen!2slk!4v1714647300001!5m2!1sen!2slk"
  },
  {
    name: "EMBILIPITIYA NODE",
    phone: "074 278 9533",
    address: "EMBILIPITIYA, SRI LANKA",
    code: "NOD-03",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.123!2d80.849!3d6.341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae1468!2sEmbilipitiya!5e0!3m2!1sen!2slk!4v1714647300002!5m2!1sen!2slk"
  }
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050811] pb-64 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-primary/5 blur-[220px] rounded-full -mr-96 -mt-96 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-primary/5 blur-[180px] rounded-full -ml-48 -mb-48 pointer-events-none" />

      {/* Header Area */}
      <div className="pt-64 pb-48 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl space-y-12">
             <div className="flex items-center gap-8 animate-in fade-in slide-in-from-left-12 duration-1000">
                <div className="inline-flex items-center gap-6 px-10 py-4 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-3xl shadow-[0_0_80px_rgba(239,68,68,0.3)]">
                   <Activity className="w-6 h-6 text-primary animate-pulse" />
                   <span className="text-[11px] font-black uppercase tracking-[0.6em] text-primary italic leading-none">UPLINK ESTABLISHED PROTOCOL</span>
                </div>
                <div className="w-16 h-16 rounded-[1.5rem] bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-800 shadow-2xl">
                   <Terminal className="w-8 h-8" />
                </div>
             </div>
            <h1 className="text-[5rem] md:text-[11rem] font-black text-white tracking-tighter leading-[0.8] uppercase italic drop-shadow-[0_40px_100px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-bottom-12 duration-1000">
              ELITE <br /> <span className="text-primary italic">SUPPORT</span>
            </h1>
            <div className="flex items-center gap-8 text-slate-600 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
               <Zap className="w-10 h-10 text-primary animate-pulse" />
               <p className="text-xl md:text-3xl text-slate-600 font-black uppercase tracking-tight italic leading-relaxed max-w-4xl">
                 From mission-critical engineering consultations to elite hardware deployment, our specialists are active across three strategic nodes to serve you.
               </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 space-y-64 relative z-10">
        {/* Branch Details Grid */}
        <div className="grid lg:grid-cols-3 gap-14">
          {BRANCH_LOCATIONS.map((branch, idx) => (
            <div key={branch.name} className="p-16 bg-white/[0.01] rounded-[5rem] border border-white/5 space-y-12 group hover:border-primary/60 transition-all duration-1000 shadow-[0_50px_150px_rgba(0,0,0,0.8)] relative overflow-hidden hover:-translate-y-6">
               <div className="absolute top-0 right-0 p-12">
                  <span className="text-[11px] font-black text-slate-800 uppercase tracking-[0.5em] italic leading-none">{branch.code}</span>
               </div>
               <div className="flex items-center justify-between relative z-10">
                 <div className="w-20 h-20 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-1000 shadow-2xl group-hover:shadow-[0_20px_50px_rgba(239,68,68,0.5)]">
                   <MapPin className="w-10 h-10" />
                 </div>
                 <Globe className="w-10 h-10 text-slate-900 animate-spin-slow group-hover:text-primary transition-colors duration-1000" />
               </div>
               <div className="space-y-8 relative z-10">
                 <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none group-hover:text-primary transition-colors duration-700">{branch.name}</h3>
                 <div className="space-y-6">
                    <div className="flex items-center gap-6 text-slate-700">
                      <Phone className="w-6 h-6 text-primary" />
                      <span className="text-lg font-black tracking-widest italic group-hover:text-slate-500 transition-colors duration-700">{branch.phone}</span>
                    </div>
                    <div className="flex items-center gap-6 text-slate-800">
                      <Mail className="w-6 h-6 text-primary/30" />
                      <span className="text-[11px] font-black uppercase tracking-[0.4em] italic leading-none">OZONECOMPUTER7@GMAIL.COM</span>
                    </div>
                 </div>
               </div>
               
               <div className="aspect-square rounded-[4rem] overflow-hidden border-2 border-white/5 relative shadow-inner group-hover:border-primary/30 transition-all duration-1000">
                  <iframe 
                    src={branch.map} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    title={branch.name}
                    className="grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2s] transform group-hover:scale-110"
                  ></iframe>
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050811] via-transparent to-transparent opacity-80" />
               </div>
               <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-40 items-start">
          {/* Form Side */}
          <div className="space-y-20">
            <div className="space-y-10">
              <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-2xl">TRANSMIT <span className="text-primary italic">INTEL</span></h2>
              <div className="flex items-center gap-6 text-slate-800">
                 <Terminal className="w-8 h-8" />
                 <p className="text-slate-600 font-black uppercase tracking-tight italic text-xl md:text-2xl leading-relaxed max-w-2xl">
                   Submit your engineering inquiries or request an architect quotation directly. Our command support team will respond within the next 2-4 operational hours.
                 </p>
              </div>
            </div>
            
            <div className="grid gap-10">
               <ContactInfoCard 
                 icon={<Clock className="w-8 h-8" />}
                 label="OPERATIONAL HOURS"
                 value="08:30 AM - 06:30 PM (MON-SAT)"
               />
               <ContactInfoCard 
                 icon={<Globe className="w-8 h-8" />}
                 label="CENTRAL UPLINK"
                 value="OZONECOMPUTER7@GMAIL.COM"
               />
               <ContactInfoCard 
                 icon={<MessageCircle className="w-8 h-8" />}
                 label="DIRECT COMMS"
                 value="+94 77 753 9333"
               />
            </div>
          </div>

          {/* Form Component */}
          <div className="relative group">
             <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-primary/10 blur-[200px] rounded-full pointer-events-none animate-pulse" />
             <div className="bg-white/[0.01] border border-white/5 p-16 md:p-20 rounded-[6rem] shadow-[0_60px_200px_rgba(0,0,0,1)] backdrop-blur-3xl relative z-10 hover:border-primary/40 transition-all duration-1000">
                <div className="flex items-center justify-between mb-16">
                   <div className="flex items-center gap-6">
                      <Zap className="w-6 h-6 text-primary animate-pulse" />
                      <span className="text-[11px] font-black text-primary uppercase tracking-[0.6em] italic leading-none">SECURE TRANSMISSION NODE</span>
                   </div>
                   <Activity className="w-6 h-6 text-slate-900" />
                </div>
                <ContactForm />
                
                <div className="mt-16 flex items-center gap-6 opacity-10 group-hover:opacity-100 transition-opacity duration-1000">
                   <div className="w-32 h-px bg-slate-900" />
                   <Terminal className="w-5 h-5 text-slate-900" />
                   <div className="w-32 h-px bg-slate-900" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactInfoCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-10 p-12 rounded-[3.5rem] bg-white/[0.01] border border-white/5 group hover:border-primary/40 transition-all duration-1000 shadow-[0_40px_100px_rgba(0,0,0,0.8)] hover:-translate-y-3">
       <div className="w-20 h-20 rounded-[1.75rem] bg-white/[0.02] border border-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-1000 shadow-2xl group-hover:shadow-[0_20px_50px_rgba(239,68,68,0.4)]">
          {icon}
       </div>
       <div className="space-y-3">
         <p className="text-[11px] font-black text-slate-800 uppercase tracking-[0.5em] italic leading-none group-hover:text-slate-500 transition-colors duration-700">{label}</p>
         <p className="text-xl md:text-2xl font-black text-white uppercase tracking-widest italic leading-none drop-shadow-2xl">{value}</p>
       </div>
    </div>
  );
}
