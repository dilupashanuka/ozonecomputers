"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Wrench, Info, MessageSquare, User, Zap, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOBILE_LINKS = [
  { href: "/", label: "HOME", icon: Home },
  { href: "/products", label: "SCAN", icon: ShoppingBag },
  { href: "/services", label: "LABS", icon: Zap },
  { href: "/wishlist", label: "INTEL", icon: Activity },
  { href: "/contact", label: "UPLINK", icon: MessageSquare },
];

export function MobileBottomNav({ settings }: { settings?: any }) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) { // scrolling down
          setIsVisible(false);
        } else { // scrolling up
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <div className={cn(
      "md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-[400] w-[95%] max-w-lg transition-all duration-700 ease-in-out",
      isVisible ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0 pointer-events-none"
    )}>
      <div className="bg-[#050811]/90 rounded-[2.5rem] px-8 py-5 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex items-center justify-between backdrop-blur-3xl">
        {MOBILE_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className="flex flex-col items-center gap-1 group"
            >
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 relative overflow-hidden",
                isActive ? "bg-primary text-white shadow-[0_15px_30px_rgba(239,68,68,0.4)] scale-110" : "text-slate-700 group-hover:text-white"
              )}>
                <Icon className={cn("w-6 h-6", isActive && "animate-pulse")} />
                {isActive && (
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
