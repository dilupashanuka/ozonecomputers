// src/components/Header.tsx
import Link from 'next/link';
import { ShoppingCart, Cpu, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          NANO<span className="text-white">TEK</span> LK
        </Link>
        
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
          <Link href="/products" className="hover:text-cyan-400 transition">Products</Link>
          <Link href="/builder" className="hover:text-cyan-400 transition flex items-center gap-2">
            <Cpu size={18} /> PC Builder
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="relative hover:text-cyan-400">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
          </button>
          <button className="md:hidden"><Menu /></button>
        </div>
      </div>
    </header>
  );
}
