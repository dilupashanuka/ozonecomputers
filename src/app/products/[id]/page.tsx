import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShoppingCart, MessageCircle, CheckCircle2, ChevronRight, Zap, Shield, Truck, Headphones, Activity, Terminal, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ProductCard } from '@/components/shop/ProductCard';
import { ProductGallery } from '@/components/shop/ProductGallery';
import { WishlistButton } from '@/components/shop/WishlistButton';

export const revalidate = 0;

export default async function ProductDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) {
    notFound();
  }

  // Fetch related products
  const { data: relatedProducts } = await supabase
    .from('products')
    .select('*')
    .eq('category', product.category)
    .neq('id', id)
    .limit(4);

  const mainWaNumber = '94777539333';
  const whatsappUrl = `https://wa.me/${mainWaNumber}?text=I'm interested in ${product.title} (ID: ${product.id}). Please provide more details on OZONE Labs inventory.`;

  return (
    <div className="min-h-screen bg-[#050811] pt-48 pb-40">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.5em] text-slate-700 mb-20 italic">
          <Link href="/" className="hover:text-primary transition-colors">HOME NODE</Link>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          <Link href="/products" className="hover:text-primary transition-colors">ELITE INVENTORY</Link>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          <span className="text-primary italic">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7 space-y-12">
            <div className="relative group">
               <div className="absolute -inset-4 bg-primary/5 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
               <ProductGallery
                 images={[
                   product.image_url,
                   ...(Array.isArray(product.images) ? product.images : [])
                 ].filter(Boolean)}
                 title={product.title}
               />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-10">
              <div className="flex flex-wrap items-center gap-6">
                 <div className="inline-flex items-center gap-4 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 shadow-2xl">
                   <Zap className="w-4 h-4 text-primary animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic leading-none">LAB VERIFIED MODULE</span>
                 </div>
                 <div className="inline-flex items-center gap-4 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10">
                   <Terminal className="w-4 h-4 text-slate-700" />
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700 italic leading-none">
                     {product.category}
                   </span>
                 </div>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.8] uppercase italic drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                {product.title}
              </h1>
              
              <div className="flex flex-col md:flex-row md:items-center gap-10 pt-6">
                <div className="text-5xl md:text-7xl font-black text-white tracking-widest italic group-hover:text-primary transition-colors">
                  {product.price ? `Rs. ${product.price.toLocaleString()}` : 'ENQUIRE'}
                </div>
                {product.in_stock ? (
                  <div className="flex items-center gap-4 text-primary text-[10px] font-black uppercase tracking-[0.4em] bg-primary/10 px-8 py-3.5 rounded-2xl border border-primary/20 backdrop-blur-3xl shadow-2xl italic">
                    <Activity className="w-4 h-4 animate-pulse" />
                    OPERATIONAL NOW
                  </div>
                ) : (
                  <div className="text-slate-800 text-[10px] font-black uppercase tracking-[0.4em] bg-white/[0.02] px-8 py-3.5 rounded-2xl border border-white/5 backdrop-blur-3xl italic">
                    OFFLINE / DEPLETED
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-12 rounded-[3.5rem] relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[60px] pointer-events-none" />
              <div className="flex items-center gap-4 mb-8">
                 <Terminal className="w-5 h-5 text-slate-800" />
                 <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-700 italic">TECHNICAL NARRATIVE</h3>
              </div>
              <p className="text-2xl text-slate-500 font-black uppercase tracking-tight italic leading-relaxed group-hover:text-slate-400 transition-colors">
                {product.description || `THE ${product.title} REPRESENTS THE PEAK OF HIGH-IMPACT ${product.category} ARCHITECTURE. RIGOROUSLY ANALYZED BY OZONE LABS TO EXCEED PERFORMANCE BENCHMARKS AND ENSURE MAXIMUM LONG-TERM STABILITY.`}
              </p>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-8">
              <SpecBox icon={<Shield className="w-6 h-6" />} label="SECURITY" value="3Y GLOBAL WARRANTY" />
              <SpecBox icon={<Zap className="w-6 h-6" />} label="STATUS" value="LAB SEALED / ELITE" />
              <SpecBox icon={<Truck className="w-6 h-6" />} label="LOGISTICS" value="ISLANDWIDE PRIORITY" />
              <SpecBox icon={<Headphones className="w-6 h-6" />} label="ENGINEERING" value="24/7 ELITE SUPPORT" />
            </div>

            <div className="flex flex-col sm:flex-row gap-8 pt-8">
              <Link 
                href={whatsappUrl}
                target="_blank"
                className={cn(
                  buttonVariants({ size: "lg" }), 
                  "flex-1 h-24 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.3em] rounded-2xl shadow-[0_20px_50px_rgba(239,68,68,0.5)] flex items-center justify-center gap-6 text-xl transform transition-all hover:-translate-y-2 italic group"
                )}
              >
                <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
                SECURE VIA UPLINK
              </Link>
              <div className="flex items-center justify-center">
                 <WishlistButton productId={product.id} size="lg" />
              </div>
            </div>

            {/* Trust Markers */}
            <div className="grid gap-6 pt-12 border-t border-white/5">
              <FeatureItem text="CERTIFIED OZONE LABORATORY CONFIGURATION" />
              <FeatureItem text="PRIORITY 1-DAY LOGISTICS PROTOCOL" />
              <FeatureItem text="POST-DEPLOYMENT ENGINEERING CONSULTATION" />
            </div>
          </div>
        </div>

        {/* Technical Specs Overlay */}
        <div className="mt-64 border-t border-white/5 pt-32">
          <div className="max-w-6xl">
            <div className="flex items-center gap-6 mb-16">
               <div className="w-16 h-16 rounded-[1.25rem] bg-white/[0.03] border border-white/10 flex items-center justify-center text-primary shadow-2xl">
                  <Terminal className="w-8 h-8" />
               </div>
               <h2 className="text-6xl md:text-[8rem] font-black text-white tracking-tighter uppercase italic leading-none">LAB <span className="text-primary italic">BLUEPRINTS</span></h2>
            </div>
            <div className="bg-white/[0.01] rounded-[5rem] overflow-hidden border border-white/5 p-16 md:p-24 relative shadow-2xl group">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              {product.specifications && Object.keys(product.specifications).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value], idx) => (
                    <div 
                      key={key} 
                      className={cn(
                        "grid grid-cols-1 md:grid-cols-3 p-10 rounded-[2.5rem] gap-8 md:gap-16 transition-all duration-500",
                        idx % 2 === 0 ? "bg-white/[0.03] hover:bg-white/[0.05]" : "bg-transparent hover:bg-white/[0.02]"
                      )}
                    >
                      <div className="col-span-1 text-slate-700 font-black uppercase text-[12px] tracking-[0.5em] italic flex items-center group-hover:text-slate-500 transition-colors">{key}</div>
                      <div className="col-span-2 text-white font-black text-2xl md:text-3xl uppercase tracking-tighter italic leading-none group-hover:text-primary transition-colors">{value as string}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-32 space-y-10">
                   <div className="w-24 h-24 rounded-[2rem] bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto text-slate-800 shadow-2xl">
                      <Zap className="w-12 h-12" />
                   </div>
                   <p className="text-slate-700 font-black uppercase tracking-[0.5em] text-sm italic">AWAITING TECHNICAL DATASHEET UPLOAD</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-64">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 shadow-2xl">
                   <Activity className="w-4 h-4 text-primary animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic leading-none">SIMILAR ARCHITECTURES</span>
                </div>
                <h2 className="text-7xl md:text-[10rem] font-black text-white tracking-tighter uppercase italic leading-[0.8]">RELATED <span className="text-primary italic">NODES</span></h2>
              </div>
              <Link href="/products" className="group text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 hover:text-white transition-all flex items-center gap-6 italic">
                ENTIRE CATALOG SCAN <div className="w-16 h-16 rounded-[1.25rem] border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-2xl"><ChevronRight className="w-7 h-7 group-hover:translate-x-3 transition-transform" /></div>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SpecBox({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-primary/50 transition-all duration-700 group shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl pointer-events-none" />
      <div className="w-14 h-14 rounded-[1.25rem] bg-white/[0.03] border border-white/10 flex items-center justify-center mb-8 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-2xl">
         {icon}
      </div>
      <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em] block mb-3 italic group-hover:text-slate-500 transition-colors">{label}</span>
      <span className="text-lg font-black text-white uppercase tracking-tight italic leading-none group-hover:text-primary transition-colors">{value}</span>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-6 group">
      <div className="w-8 h-8 rounded-[1rem] bg-primary/10 flex items-center justify-center border border-primary/20 transition-all duration-500 group-hover:bg-primary group-hover:text-white shadow-2xl">
        <CheckCircle2 className="w-5 h-5" />
      </div>
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 group-hover:text-slate-400 transition-colors italic leading-none">{text}</span>
    </div>
  );
}
