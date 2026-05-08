import Link from 'next/link';
import BuildSummary from '@/components/BuildSummary';
import { ArrowRight, Zap, ShieldCheck, Truck } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 bg-slate-950/80"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Build Your Dream PC
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Sri Lanka's most advanced custom PC builder. Select compatible parts, get the best prices, and build like a pro.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/builder" className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 transition">
              Start Building <ArrowRight />
            </Link>
            <Link href="/products" className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-full font-bold text-lg transition border border-slate-700">
              Browse Parts
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="mb-12">
          <BuildSummary />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 hover:border-cyan-500/50 transition">
            <Zap className="text-cyan-400 w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Smart Compatibility</h3>
            <p className="text-slate-400">Our system automatically checks if parts fit together so you don't make mistakes.</p>
          </div>
          <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 hover:border-cyan-500/50 transition">
            <ShieldCheck className="text-cyan-400 w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Official Warranty</h3>
            <p className="text-slate-400">All parts come with verified local warranty support in Sri Lanka.</p>
          </div>
          <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 hover:border-cyan-500/50 transition">
            <Truck className="text-cyan-400 w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Island-wide Delivery</h3>
            <p className="text-slate-400">Safe packaging and fast delivery to any location in Sri Lanka.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
