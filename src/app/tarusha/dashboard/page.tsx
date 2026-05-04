import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  ArrowUpRight, 
  Plus, 
  ExternalLink,
  Clock,
  Layout,
  Star,
  Zap,
  Activity,
  Terminal,
  Cpu,
  ShieldCheck,
  Globe,
  Grid,
  Mail
} from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch Stats
  const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
  const { count: messageCount } = await supabase.from('messages').select('*', { count: 'exact', head: true });
  const { count: unreadMessages } = await supabase.from('messages').select('*', { count: 'exact', head: true }).eq('is_read', false);
  const { count: reviewCount } = await supabase.from('reviews').select('*', { count: 'exact', head: true });
  
  // Fetch Recent Activity
  const { data: recentProducts } = await supabase.from('products').select('*').order('created_at', { ascending: false }).limit(4);
  const { data: recentMessages } = await supabase.from('messages').select('*').order('created_at', { ascending: false }).limit(4);

  const stats = [
    {
      title: "Active Inventory",
      value: productCount || 0,
      icon: Package,
      trend: "LAB ALLOCATION",
      color: "text-primary",
      bg: "bg-primary/10",
      link: "/tarusha/dashboard/products"
    },
    {
      title: "Incoming Intel",
      value: messageCount || 0,
      icon: MessageSquare,
      trend: unreadMessages ? `${unreadMessages} PENDING LOGS` : "CLEAR CHANNEL",
      color: "text-cyan-500",
      bg: "bg-cyan-500/10",
      link: "/tarusha/dashboard/messages"
    },
    {
      title: "Lab Reputation",
      value: reviewCount || 0,
      icon: Star,
      trend: "VERIFIED FEEDBACK",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      link: "/tarusha/dashboard/reviews"
    }
  ];

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 border-b border-white/5 pb-14 relative">
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] pointer-events-none" />
        <div className="space-y-5 relative z-10">
           <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20">
             <Activity className="w-4 h-4 text-primary animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">SYSTEM SYNCHRONIZED</span>
           </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-white uppercase italic leading-none">OZONE <span className="text-primary">CORE</span> TERMINAL</h1>
          <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px] italic">Operational Command Center for Deiyandara, Kamburupitiya & Embilipitiya.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 relative z-10">
          <Link href="/tarusha/dashboard/products/new">
            <Button className="bg-primary hover:bg-primary/90 text-white font-black h-20 px-10 rounded-[2rem] shadow-[0_20px_50px_rgba(239,68,68,0.3)] uppercase tracking-[0.2em] text-xs transform transition-all hover:-translate-y-2 italic gap-4">
              <Plus className="w-6 h-6" /> INJECT COMPONENT
            </Button>
          </Link>
          <Link href="/" target="_blank">
            <Button variant="outline" className="border-white/10 text-slate-500 h-20 px-10 rounded-[2rem] bg-white/[0.03] hover:bg-white/[0.08] hover:text-white uppercase tracking-[0.2em] text-xs font-black transition-all italic gap-4">
              <Globe className="w-6 h-6" /> PUBLIC SECTOR
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {stats.map((stat, i) => (
          <Link key={i} href={stat.link}>
            <Card className="bg-white/[0.02] border-white/10 backdrop-blur-3xl hover:border-primary/50 transition-all duration-700 group cursor-pointer rounded-[3rem] overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
              <CardContent className="p-12 relative z-10">
                <div className="flex items-start justify-between">
                  <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center ${stat.bg} ${stat.color} transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 shadow-2xl`}>
                    <stat.icon className="w-10 h-10" />
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] bg-white/5 px-5 py-2 rounded-full italic border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    LIVE LINK
                  </div>
                </div>
                <div className="mt-10 space-y-3">
                  <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] italic">{stat.title}</p>
                  <h3 className="text-7xl font-black text-white tabular-nums tracking-tighter leading-none italic">{stat.value}</h3>
                </div>
                <div className="mt-12 pt-10 border-t border-white/5 flex items-center justify-between">
                  <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.5em] italic">{stat.trend}</p>
                  <div className="w-12 h-12 rounded-[1rem] bg-white/5 flex items-center justify-center text-slate-700 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Activity Sections */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Recent Activity */}
        <Card className="bg-white/[0.02] border-white/10 backdrop-blur-3xl rounded-[3.5rem] overflow-hidden">
          <CardHeader className="p-12 border-b border-white/5">
            <div className="flex items-center justify-between">
               <CardTitle className="text-white text-2xl font-black uppercase tracking-tighter flex items-center gap-5 italic">
                 <Terminal className="w-8 h-8 text-primary" /> LAB LOGS
               </CardTitle>
               <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.5em] italic">LATEST 4 ENTRIES</span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {recentProducts?.map((product) => (
                <div key={product.id} className="p-10 flex items-center gap-8 hover:bg-white/[0.04] transition-all group cursor-default">
                  <div className="w-16 h-16 rounded-[1.25rem] bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl">
                    <Package className="w-7 h-7" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] italic">INVENTORY INJECTED</p>
                    <p className="text-sm text-white font-black uppercase tracking-tight truncate italic">{product.title}</p>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest italic">{new Date(product.created_at).toLocaleDateString()}</p>
                     <p className="text-[8px] font-black text-slate-800 uppercase tracking-widest italic">{new Date(product.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  </div>
                </div>
              ))}
              {recentMessages?.map((msg) => (
                <div key={msg.id} className="p-10 flex items-center gap-8 hover:bg-white/[0.04] transition-all group cursor-default">
                  <div className="w-16 h-16 rounded-[1.25rem] bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-500 shadow-xl">
                    <MessageSquare className="w-7 h-7" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] italic">INTEL RECEIVED</p>
                    <p className="text-sm text-white font-black uppercase tracking-tight truncate italic">FROM: {msg.name}</p>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest italic">{new Date(msg.created_at).toLocaleDateString()}</p>
                     <p className="text-[8px] font-black text-slate-800 uppercase tracking-widest italic">{new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white/[0.02] border-white/10 backdrop-blur-3xl rounded-[3.5rem] overflow-hidden">
          <CardHeader className="p-12 border-b border-white/5">
             <div className="flex items-center justify-between">
                <CardTitle className="text-white text-2xl font-black uppercase tracking-tighter flex items-center gap-5 italic">
                  <Zap className="w-8 h-8 text-primary animate-pulse" /> COMMANDS
                </CardTitle>
                <ShieldCheck className="w-6 h-6 text-slate-800" />
             </div>
          </CardHeader>
          <CardContent className="p-12">
            <div className="grid grid-cols-2 gap-8">
              {[
                { label: "FRONTEND HERO", icon: Layout, href: "/tarusha/dashboard/hero", color: "group-hover:text-primary", bg: "group-hover:bg-primary/10" },
                { label: "BLUEPRINT LAB", icon: Cpu, href: "/tarusha/dashboard/pc-builder", color: "group-hover:text-cyan-500", bg: "group-hover:bg-cyan-500/10" },
                { label: "SEGMENT CTRL", icon: Grid, href: "/tarusha/dashboard/categories", color: "group-hover:text-primary", bg: "group-hover:bg-primary/10" },
                { label: "INTEL HUB", icon: Mail, href: "/tarusha/dashboard/messages", color: "group-hover:text-yellow-500", bg: "group-hover:bg-yellow-500/10" },
              ].map((item) => (
                <Link key={item.label} href={item.href}>
                  <Button variant="outline" className={cn(
                    "w-full h-44 flex-col gap-6 border-white/5 bg-white/[0.03] text-slate-600 transition-all duration-500 rounded-[2.5rem] font-black uppercase tracking-[0.2em] group italic",
                    item.bg, item.color
                  )}>
                    <item.icon className="w-10 h-10 group-hover:scale-125 transition-transform duration-500" />
                    <span className="text-[10px] tracking-[0.3em]">{item.label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Grid(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M3 15h18" />
      <path d="M9 3v18" />
      <path d="M15 3v18" />
    </svg>
  )
}
