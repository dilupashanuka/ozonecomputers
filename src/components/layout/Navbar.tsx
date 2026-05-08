"use client"

import Link from 'next/link';
import Image from 'next/image';
import { buttonVariants, Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X, MessageCircle, Search, Smartphone, User, Cpu, Monitor, ChevronDown, ChevronRight, ArrowRight, MapPin, Phone, ShieldCheck, Activity, Terminal, Zap } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { SearchOverlay } from './SearchOverlay';
import { WishlistNavButton } from './WishlistNavButton';

const BRANCHES = [
  { name: "Deiyandara", phone: "077 753 9333" },
  { name: "Kamburupitiya", phone: "076 990 9333" },
  { name: "Embilipitiya", phone: "074 278 9533" }
];

const NAV_LINKS = [
  { 
    label: "Inventory", 
    href: "/products",
    submenu: [
      { label: "Workstations", href: "/products?inventory=workstations", icon: Monitor },
      { label: "Flagships", href: "/products?inventory=flagships", icon: Smartphone },
      { label: "Components", href: "/products?inventory=components", icon: Cpu },
      { label: "CCTV Modules", href: "/products?inventory=cctv", icon: ShieldCheck },
    ]
  },
  { label: "Build PC", href: "/pc-builder" },
  { label: "Lab Services", href: "/services" },
  { label: "Our Mission", href: "/about" },
];

interface NavbarProps {
  settings?: {
    site_name: string;
    logo_url?: string;
    whatsapp_number?: string;
    phone_number?: string;
  }
}

export function Navbar({ settings }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeBranch, setActiveBranch] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Rotate branches in top bar
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBranch((prev) => (prev + 1) % BRANCHES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Cinematic Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-[1001] h-10 bg-slate-50 border-b border-black/5 hidden md:flex items-center overflow-hidden">
        <div className="container mx-auto px-6 flex justify-between items-center h-full">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[9px] font-black text-slate-900 uppercase tracking-[0.4em] italic leading-none">OZONE LABS OPERATIONAL</span>
            </div>
            <div className="h-3 w-px bg-black/10" />
            <div className="flex items-center gap-2">
               <Terminal className="w-3 h-3 text-primary" />
               <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] italic">SECURE NODE CONNECTED</span>
            </div>
          </div>
          
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-6 transition-all duration-500 transform">
               <div className="flex items-center gap-3 text-slate-500">
                 <MapPin className="w-3 h-3 text-primary" />
                 <span className="text-[9px] font-black uppercase tracking-[0.3em] italic">{BRANCHES[activeBranch].name} HUB</span>
               </div>
               <div className="flex items-center gap-3 text-slate-900">
                 <Phone className="w-3 h-3 text-primary animate-pulse" />
                 <span className="text-[10px] font-black tracking-widest italic">{BRANCHES[activeBranch].phone}</span>
               </div>
            </div>
            <div className="h-4 w-px bg-black/10" />
            <Link href="/services" className="text-[9px] font-black text-slate-500 hover:text-primary transition-colors uppercase tracking-[0.4em] italic">TECH SUPPORT</Link>
          </div>
        </div>
      </div>

      <nav className={cn(
        "fixed left-0 right-0 z-[1000] transition-all duration-500",
        scrolled ? "top-0 h-24 bg-slate-50/90 backdrop-blur-2xl border-b border-black/10" : "top-0 md:top-10 h-28 bg-transparent",
        !visible && !isMenuOpen ? "-translate-y-full" : "translate-y-0"
      )}>
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-6 group">
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 bg-black/[0.03] rounded-[1.25rem] p-3 border border-black/10 group-hover:border-primary/50 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] transform group-hover:rotate-6">
            <Image 
              src={settings?.logo_url || "/logo.png"} 
              alt={settings?.site_name || "OZONE Logo"} 
              fill
              sizes="64px"
              className="object-contain transition-transform duration-500 group-hover:scale-110 p-2"
              priority
            />
          </div>
          <div className="flex flex-col flex-shrink-0">
            <span className="text-xl lg:text-2xl xl:text-3xl font-black tracking-tighter text-slate-900 leading-none group-hover:text-primary transition-colors italic uppercase">
              OZONE <span className="text-primary italic">LABS</span>
            </span>
            <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.5em] mt-1 group-hover:text-slate-900 transition-colors italic">ENGINEERING INTEGRITY</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-10">
          {NAV_LINKS.map((link) => (
            <div key={link.label} className="relative group/item py-4">
              <Link 
                href={link.href} 
                className="text-[10px] xl:text-[12px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-slate-900 transition-all flex items-center gap-2 italic"
              >
                {link.label}
                {link.submenu && <ChevronDown className="w-3 h-3 xl:w-4 xl:h-4 transition-transform group-hover/item:rotate-180" />}
              </Link>
              
              {link.submenu && (
                <div className="absolute top-full left-0 w-72 pt-6 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-500 transform translate-y-4 group-hover/item:translate-y-0">
                  <div className="bg-[#0a0d14] border border-black/10 rounded-[2.5rem] p-4 shadow-[0_50px_100px_rgba(0,0,0,0.9)] overflow-hidden">
                    <div className="grid gap-2">
                      {link.submenu.map((sub) => (
                        <Link 
                          key={sub.label}
                          href={sub.href}
                          className="flex items-center gap-5 p-5 rounded-2xl hover:bg-black/[0.03] text-slate-600 hover:text-slate-900 transition-all group/sub"
                        >
                          <div className="w-12 h-12 rounded-xl bg-black/5 border border-black/10 flex items-center justify-center group-hover/sub:bg-primary group-hover/sub:border-primary group-hover/sub:text-slate-900 transition-all duration-500 shadow-xl group-hover/sub:shadow-primary/20">
                            <sub.icon className="w-6 h-6" />
                          </div>
                          <span className="text-[11px] font-black uppercase tracking-[0.2em] italic">{sub.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 lg:gap-4 xl:gap-8">
          <button 
            onClick={() => setSearchOpen(true)}
            className="w-12 h-12 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-black/5 transition-all duration-500"
          >
            <Search className="w-6 h-6" />
          </button>

          <WishlistNavButton />

          <Link 
            href="/tarusha" 
            className="w-12 h-12 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-black/5 transition-all duration-500"
          >
            <User className="w-6 h-6" />
          </Link>

          <Link 
            href={`https://wa.me/${(settings?.whatsapp_number || '94777539333').replace(/[^0-9]/g, '')}`}
            target="_blank"
            className={cn(
              buttonVariants({ variant: "default" }), 
              "hidden lg:flex h-12 xl:h-14 px-8 xl:px-10 text-[10px] xl:text-xs bg-primary hover:bg-primary/90 text-slate-900 font-black uppercase tracking-[0.3em] rounded-2xl shadow-[0_20px_40px_rgba(239,68,68,0.3)] transition-all hover:scale-105 active:scale-95 italic"
            )}
          >
            <Zap className="w-4 h-4 mr-3 animate-pulse" />
            LAB CHAT
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden w-14 h-14 bg-black/5 rounded-2xl flex items-center justify-center text-slate-900 border border-black/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      </nav>

      {/* Cinematic Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 bg-slate-50 lg:hidden transition-all duration-700 ease-in-out z-[9999] overflow-hidden",
        isMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-full pointer-events-none"
      )}>
        {/* Animated background shapes */}
        <div className="absolute top-[-20%] right-[-20%] w-[100%] h-[100%] bg-primary/5 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-20%] w-[100%] h-[100%] bg-cyan-500/5 blur-[180px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="flex flex-col h-full pt-28 px-8 pb-12 relative z-10 overflow-y-auto custom-scrollbar">
          {/* Menu Header */}
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-[1.5rem] bg-black/[0.03] border border-black/10 flex items-center justify-center shadow-2xl">
                 <Image src={settings?.logo_url || "/logo.png"} alt="Logo" width={40} height={40} className="object-contain" />
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">OZONE <span className="text-primary">LABS</span></span>
                <div className="flex items-center gap-3">
                   <Activity className="w-3 h-3 text-primary animate-pulse" />
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] italic">ACTIVE HUB NODE</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="w-16 h-16 rounded-2xl bg-black/5 border border-black/10 flex items-center justify-center text-slate-900 active:scale-90 transition-all duration-500"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          {/* Menu Links */}
          <div className="grid gap-6">
            {NAV_LINKS.map((link, i) => (
              <Link 
                key={link.label}
                href={link.href}
                className="group relative flex items-center justify-between p-10 rounded-[3rem] bg-black/[0.02] border border-black/5 active:bg-primary/10 active:border-primary/50 transition-all duration-500 overflow-hidden shadow-xl"
                style={{ transitionDelay: `${i * 100}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-8">
                   <div className="w-16 h-16 rounded-[1.25rem] bg-black/[0.03] flex items-center justify-center group-active:scale-110 transition-transform shadow-2xl">
                      <ChevronRight className="w-8 h-8 text-primary" />
                   </div>
                   <div className="flex flex-col space-y-1">
                     <span className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none italic">
                       {link.label}
                     </span>
                     <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] italic">INITIALIZE SECTOR ACCESS</span>
                   </div>
                </div>
                <ArrowRight className="w-8 h-8 text-slate-800 group-active:text-slate-900 transition-colors" />
              </Link>
            ))}

            {/* Management Portal Shortcut */}
            <Link 
              href="/tarusha" 
              className="group relative flex items-center justify-between p-10 rounded-[3rem] bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 active:scale-[0.98] transition-all duration-500 shadow-[0_20px_50px_rgba(239,68,68,0.2)]"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center gap-8">
                 <div className="w-16 h-16 rounded-[1.25rem] bg-primary text-slate-900 flex items-center justify-center shadow-2xl shadow-primary/40">
                    <User className="w-8 h-8" />
                 </div>
                 <div className="flex flex-col space-y-1">
                   <span className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none italic">
                     COMMAND
                   </span>
                   <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] italic">ADMIN TERMINAL ACCESS</span>
                 </div>
              </div>
              <ChevronRight className="w-8 h-8 text-primary" />
            </Link>
          </div>

          {/* Branches Section */}
          <div className="mt-16 pt-16 border-t border-black/10">
            <div className="space-y-10">
              <span className="text-[12px] font-black text-slate-700 uppercase tracking-[0.5em] px-2 italic">LAB HUB NETWORK</span>
              <div className="grid gap-6">
                {BRANCHES.map((branch) => (
                  <div key={branch.name} className="p-10 rounded-[2.5rem] bg-black/[0.02] border border-black/5 flex items-center justify-between group shadow-xl">
                    <div className="flex flex-col space-y-2">
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] italic leading-none">NODE</span>
                      <span className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">{branch.name}</span>
                    </div>
                    <div className="flex flex-col text-right space-y-2">
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] italic leading-none">SECURE LINE</span>
                      <span className="text-xl font-black text-primary group-active:text-slate-900 transition-colors italic tracking-widest">
                         {branch.phone}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
