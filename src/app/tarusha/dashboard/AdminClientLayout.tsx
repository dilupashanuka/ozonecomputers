"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  MessageSquare, 
  LogOut, 
  Image as ImageIcon, 
  Grid, 
  Share2, 
  Star, 
  Mail, 
  HelpCircle, 
  FileText,
  Trophy,
  Menu,
  X,
  Smartphone,
  Monitor,
  Cpu,
  User as UserIcon,
  Activity,
  Zap,
  Terminal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { logout } from '../actions';

interface AdminClientLayoutProps {
  user: any;
  children: React.ReactNode;
}

export function AdminClientLayout({ user, children }: AdminClientLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navGroups = [
    {
      label: 'COMMAND CENTER',
      items: [
        { label: 'TERMINAL OVERVIEW', href: '/tarusha/dashboard', icon: LayoutDashboard },
      ]
    },
    {
      label: 'LAB FRONTEND CONTROL',
      items: [
        { label: 'HERO DEPLOYMENT', href: '/tarusha/dashboard/hero', icon: ImageIcon },
        { label: 'PC BLUEPRINTS', href: '/tarusha/dashboard/pc-builder', icon: Cpu },
        { label: 'GLOBAL PARTNERS', href: '/tarusha/dashboard/partners', icon: Trophy },
      ]
    },
    {
      label: 'INVENTORY LOGISTICS',
      items: [
        { label: 'CORE STOCK', href: '/tarusha/dashboard/products', icon: Package },
        { label: 'FLAGSHIPS', href: '/tarusha/dashboard/flagships', icon: Smartphone },
        { label: 'WORKSTATIONS', href: '/tarusha/dashboard/computers', icon: Monitor },
        { label: 'COMPONENTS', href: '/tarusha/dashboard/components', icon: Cpu },
        { label: 'PC BUILDS', href: '/tarusha/dashboard/pc-builds', icon: Cpu },
        { label: 'MODULE MAPPING', href: '/tarusha/dashboard/pc-builds/mapping', icon: Grid },
        { label: 'SEGMENTS', href: '/tarusha/dashboard/categories', icon: Grid },
        { label: 'INVENTORY HEADER', href: '/tarusha/dashboard/inventory-header', icon: FileText },
      ]
    },
    {
      label: 'CORE CONFIGURATION',
      items: [
        { label: 'SERVICES MODULE', href: '/tarusha/dashboard/services', icon: Settings },
        { label: 'LAB FAQ', href: '/tarusha/dashboard/faq', icon: HelpCircle },
        { label: 'SYSTEM PARAMS', href: '/tarusha/dashboard/settings', icon: Settings },
      ]
    },
    {
      label: 'LAB INTEL',
      items: [
        { label: 'SOCIAL SYNC', href: '/tarusha/dashboard/social-feed', icon: Share2 },
        { label: 'REPORTS', href: '/tarusha/dashboard/reviews', icon: Star },
        { label: 'INCOMING INTEL', href: '/tarusha/dashboard/messages', icon: Mail },
      ]
    }
  ];


  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-600 selection:bg-primary/30">
      {/* Mobile Sidebar Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[100] md:hidden transition-all duration-500",
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={cn(
        "bg-[#080b11] border-r border-black/5 flex flex-col fixed md:sticky top-0 h-screen transition-all duration-700 z-[101]",
        "w-80 md:flex",
        isSidebarOpen ? "left-0" : "-left-full md:left-0"
      )}>
        <div className="p-10 border-b border-black/5 flex items-center justify-between relative overflow-hidden">
           <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-[40px] pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)] transform -rotate-12">
                <Terminal className="w-6 h-6 text-slate-900" />
              </div>
              <h2 className="text-2xl font-black tracking-tighter text-slate-900 italic">OZONE <span className="text-primary">CORE</span></h2>
            </div>
            <p className="text-[9px] text-slate-600 uppercase tracking-[0.4em] font-black italic ml-14">Central Terminal</p>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden text-slate-900" onClick={() => setIsSidebarOpen(false)}>
             <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="px-8 py-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/[0.02] border border-black/5">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-black/10 flex items-center justify-center text-sm font-black text-primary italic">
              {user.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-slate-900 truncate uppercase italic">{user.email?.split('@')[0]}</p>
              <p className="text-[9px] text-slate-600 truncate font-black uppercase tracking-widest italic">Core Operator</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-4 space-y-10 custom-scrollbar">
          {navGroups.map((group) => (
            <div key={group.label} className="space-y-4">
              <h3 className="px-4 text-[9px] font-black text-slate-700 uppercase tracking-[0.4em] italic border-l-2 border-primary/20">{group.label}</h3>
              <div className="space-y-1.5">
                {group.items.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className="group flex items-center gap-4 px-5 py-3 text-[11px] font-black rounded-xl hover:bg-black/5 text-slate-500 hover:text-slate-900 transition-all duration-300 italic uppercase tracking-wider"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <item.icon className="w-4 h-4 group-hover:text-primary transition-all duration-500 group-hover:scale-110" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-8 border-t border-black/5 bg-[#0a0d14]">
          <form action={logout}>
            <Button variant="ghost" className="w-full flex items-center justify-start gap-4 text-slate-600 hover:text-primary hover:bg-primary/10 font-black rounded-2xl h-14 italic tracking-widest" type="submit">
              <LogOut className="w-5 h-5" />
              TERMINATE SESSION
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col min-h-screen overflow-x-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full -mr-96 -mt-96" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] rounded-full -ml-64 -mb-64" />

        <header className="h-24 border-b border-black/5 flex items-center px-10 md:px-14 sticky top-0 bg-slate-50/90 backdrop-blur-2xl z-[90]">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden mr-6 text-slate-900" 
            onClick={() => setIsSidebarOpen(true)}
          >
             <Menu className="w-7 h-7" />
          </Button>

          <div className="flex items-center gap-4 text-[10px] md:text-xs font-black text-slate-600 italic uppercase tracking-[0.2em]">
            <span className="hover:text-primary transition-colors cursor-pointer">Terminal</span>
            <span className="text-slate-800">//</span>
            <span className="text-slate-600 truncate max-w-[150px] md:max-w-none">Node Controller</span>
          </div>
          <div className="ml-auto flex items-center gap-6">
            <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary tracking-[0.2em] uppercase italic shadow-[0_0_20px_rgba(239,68,68,0.1)]">
              <Activity className="w-4 h-4 animate-pulse" />
              <span className="hidden sm:inline">System</span> Authorized
            </div>
          </div>
        </header>

        <div className="flex-1 p-10 md:p-14">
          <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
