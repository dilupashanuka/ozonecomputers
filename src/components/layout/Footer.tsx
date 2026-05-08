import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ArrowUpRight, ShieldCheck, Truck, CreditCard, Activity, Cpu, Zap } from 'lucide-react';
import Image from 'next/image';

interface FooterProps {
  settings?: {
    site_name?: string;
    phone_number?: string;
    address?: string;
    email?: string;
    whatsapp_number?: string;
    facebook_url?: string;
    instagram_url?: string;
    tiktok_url?: string;
    youtube_url?: string;
    twitter_url?: string;
    discord_url?: string;
    reddit_url?: string;
    twitch_url?: string;
    logo_url?: string;
  }
}

const BRANCHES = [
  { name: "Deiyandara", phone: "077 753 9333", address: "Main Street, Deiyandara" },
  { name: "Kamburupitiya", phone: "076 990 9333", address: "Main Street, Kamburupitiya" },
  { name: "Embilipitiya", phone: "074 278 9533", address: "Main Street, Embilipitiya" }
];

export function Footer({ settings }: FooterProps) {
  const waNumber = (settings?.whatsapp_number || '94777539333').replace(/[^0-9]/g, '');
  const email    = settings?.email || 'ozonecomputer7@gmail.com';

  const socials = [
    { 
      id: 'facebook', 
      url: settings?.facebook_url || "https://web.facebook.com/ozonecomputerslk/", 
      color: 'hover:bg-primary', 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> 
    },
    { 
      id: 'instagram', 
      url: settings?.instagram_url, 
      color: 'hover:bg-primary', 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> 
    },
    { 
      id: 'tiktok', 
      url: settings?.tiktok_url, 
      color: 'hover:bg-primary', 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31 0 2.591.214 3.75.606V7.06c-1.027-.64-2.234-1.011-3.525-1.011-3.45 0-6.25 2.8-6.25 6.25s2.8 6.25 6.25 6.25c1.291 0 2.498-.371 3.525-1.011v4.707c-1.159.392-2.44.606-3.75.606-6.627 0-12-5.373-12-12s5.373-12 12-12zm9.825 8.286v5.714c-2.14 0-3.886 1.747-3.886 3.887V24h-5.714v-9.563c0-2.139 1.746-3.886 3.886-3.886h5.714z"/></svg> 
    },
    { 
      id: 'youtube', 
      url: settings?.youtube_url, 
      color: 'hover:bg-primary', 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> 
    },
  ].filter(s => s.url || s.id === 'facebook');

  return (
    <footer className="bg-slate-50 border-t border-black/5 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[180px] rounded-full -mb-96 -mr-96 pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full -mt-48 -ml-48 pointer-events-none" />

      {/* Main grid */}
      <div className="container mx-auto px-6 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Brand & Socials */}
          <div className="lg:col-span-4 space-y-12">
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-4">
                <div className="w-14 h-14 bg-black/5 border border-black/10 rounded-[1.25rem] flex items-center justify-center p-3 group transform -rotate-6 transition-transform hover:rotate-0">
                   <Image src={settings?.logo_url || "/logo.png"} alt="Ozone Logo" width={40} height={40} className="object-contain group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col">
                   <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                     OZONE<span className="text-primary">LABS</span>
                   </h3>
                   <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] italic mt-1">EST. PRODUCTION</span>
                </div>
              </Link>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm font-black uppercase tracking-tight italic">
                Sri Lanka&apos;s elite destination for high-impact gaming architecture and precision workstations. Operational across 3 strategic branches.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <p className="text-[10px] font-black text-primary uppercase tracking-[0.5em] italic">LAB NETWORK</p>
                 <div className="h-px flex-1 bg-black/5" />
              </div>
              <div className="flex gap-4">
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.url!}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-14 h-14 rounded-2xl bg-black/[0.03] border border-black/10 flex items-center justify-center text-slate-500 transition-all duration-500 ${s.color} hover:text-slate-900 hover:border-transparent hover:scale-110 shadow-2xl hover:shadow-primary/20`}
                    title={s.id}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-black/[0.02] border border-black/10 space-y-5 relative group overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-3xl pointer-events-none group-hover:bg-primary/20 transition-all" />
               <div className="flex items-center gap-4 text-primary relative z-10">
                 <Mail className="w-5 h-5" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">COMMUNICATION LINE</span>
               </div>
               <a href={`mailto:${email}`} className="text-xl md:text-2xl font-black text-slate-900 hover:text-primary transition-colors block italic tracking-tighter relative z-10">
                 {email}
               </a>
            </div>
          </div>

          {/* Branches Grid */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 gap-12">
            <div className="space-y-10">
              <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-[0.5em] italic border-l-2 border-primary/40 pl-4">LAB LOCATIONS</h4>
              <div className="space-y-10">
                {BRANCHES.map((branch) => (
                  <div key={branch.name} className="space-y-4 group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-black/[0.03] border border-black/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-slate-900 transition-all duration-500 shadow-lg">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">{branch.name}</span>
                    </div>
                    <div className="pl-14 space-y-2">
                       <p className="text-[11px] text-slate-600 font-black uppercase tracking-tight italic">{branch.address}</p>
                       <a href={`tel:${branch.phone.replace(/\s/g, '')}`} className="text-sm font-black text-slate-600 hover:text-primary transition-colors flex items-center gap-3 italic tracking-widest">
                         <Phone className="w-4 h-4 text-primary" />
                         {branch.phone}
                       </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-10">
               <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-[0.5em] italic border-l-2 border-primary/40 pl-4">SEGMENT DIRECTORY</h4>
               <ul className="space-y-6">
                {[
                  { label: 'Gaming Units',     href: '/products?inventory=flagships' },
                  { label: 'Workstations',  href: '/products?inventory=workstations' },
                  { label: 'Components',    href: '/products?inventory=components' },
                  { label: 'CCTV Modules',    href: '/products?inventory=cctv' },
                  { label: 'PC Blueprint',    href: '/pc-builder' },
                  { label: 'Lab Services',    href: '/services' },
                ].map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-4 text-slate-500 hover:text-slate-900 text-xs font-black transition-all uppercase tracking-[0.2em] italic"
                    >
                      <Zap className="w-4 h-4 text-slate-800 group-hover:text-primary transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Support & Payments */}
          <div className="lg:col-span-3 space-y-12">
             <div className="space-y-8">
               <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-[0.5em] italic border-l-2 border-primary/40 pl-4">UPTIME</h4>
               <div className="space-y-4">
                  <div className="flex justify-between items-center p-5 rounded-2xl bg-black/[0.02] border border-black/5 group hover:border-primary/20 transition-all duration-500">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest italic">MON - SAT</span>
                    <span className="text-[10px] font-black text-slate-900 uppercase italic tracking-widest">08:30 - 18:30</span>
                  </div>
                  <div className="flex justify-between items-center p-5 rounded-2xl bg-black/[0.02] border border-black/5 opacity-40">
                    <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest italic">SUNDAY</span>
                    <span className="text-[10px] font-black text-primary uppercase italic tracking-widest">OFFLINE</span>
                  </div>
               </div>
             </div>

             <div className="space-y-8">
                <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-[0.5em] italic border-l-2 border-primary/40 pl-4">ALLOCATION METHODS</h4>
                <div className="grid grid-cols-2 gap-3">
                   {[
                     { label: 'COD', icon: <Truck className="w-4 h-4" /> },
                     { label: 'KOKO', icon: <CreditCard className="w-4 h-4" /> },
                     { label: 'VISA', icon: <CreditCard className="w-4 h-4" /> },
                     { label: 'BANK', icon: <ShieldCheck className="w-4 h-4" /> },
                   ].map(item => (
                     <div key={item.label} className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-black/[0.02] border border-black/5 text-[9px] font-black text-slate-600 uppercase tracking-widest italic transition-all duration-500 hover:border-black/20 hover:text-slate-600 hover:bg-white/[0.04]">
                        <span className="text-primary">{item.icon}</span>
                        {item.label}
                     </div>
                   ))}
                </div>
             </div>

             <Link
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                className="flex items-center justify-between w-full p-8 bg-primary text-slate-900 rounded-[2.5rem] shadow-[0_20px_50px_rgba(239,68,68,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex flex-col relative z-10">
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-70 italic mb-1">ENQUIRE NOW</span>
                   <span className="text-xl font-black uppercase tracking-tighter italic">LAB OPERATOR</span>
                </div>
                <ArrowUpRight className="w-8 h-8 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500 relative z-10" />
              </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-12 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex gap-10 text-[9px] font-black uppercase tracking-[0.3em] text-slate-700 italic">
            <Link href="/privacy" className="hover:text-primary transition-colors">PRIVACY PROTOCOL</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">TERMS OF SERVICE</Link>
            <Link href="/warranty" className="hover:text-primary transition-colors">WARRANTY POLICY</Link>
          </div>

          <p className="text-slate-700 text-[9px] font-black uppercase tracking-[0.4em] text-center md:text-left italic">
            © {new Date().getFullYear()} OZONE COMPUTERS. ENGINEERED BY{' '}
            <a href="https://shanukadigital.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-primary transition-all duration-500">
              SHANUKA DIGITAL
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
