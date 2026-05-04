import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Monitor, Smartphone, Cpu, ShieldCheck, Truck, CreditCard, Zap, Shield, Heart, Sparkles, Star, Trophy, ChevronRight, MessageCircle, HelpCircle, Settings, MapPin, Activity, Terminal, Globe } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Hero } from "@/components/home/Hero";
import { VideoReels } from "@/components/home/VideoReels";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { createClient } from "@/utils/supabase/server";
import { HeroVideo } from "@/components/home/HeroVideo";
import { HeroSubPosts } from "@/components/home/HeroSubPosts";
import { TrendingAccessories } from "@/components/home/TrendingAccessories";
import { BrandLogoClient } from '@/components/home/BrandLogoClient';
import { ScrollToTop } from '@/components/utils/ScrollToTop';
import { PCBuilderSlider } from '@/components/home/PCBuilderSlider';
import { FAQItem } from '@/components/home/FAQItem';

export const revalidate = 3600;

export default async function Home() {
  const supabase = await createClient();
  
  const { data: slides } = await supabase
    .from('hero_slides')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: reels } = await supabase
    .from('video_reels')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6);

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4);

  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .order('created_at', { ascending: true })
    .limit(4);

  const { data: heroVideos } = await supabase
    .from('hero_videos')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);

  const { data: subPosts } = await supabase
    .from('hero_sub_posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  const { data: partners } = await supabase
    .from('partners')
    .select('*')
    .order('order_index', { ascending: true })
    .order('name', { ascending: true });

  const { data: featuredCategories } = await supabase
    .from('categories')
    .select('*')
    .eq('is_featured', true)
    .limit(3);

  const { data: settingsData } = await supabase
    .from('site_settings')
    .select('*')
    .limit(1)
    .single();

  // Fetch Accessories (Category slug 'accessories')
  const { data: accessories } = await supabase
    .from('products')
    .select('*, categories!inner(name, slug)')
    .eq('categories.slug', 'accessories')
    .limit(10)
    .order('created_at', { ascending: false });

  // Fetch New Arrivals
  const { data: featuredProductsWithCat } = await supabase
    .from('products')
    .select('*, categories(name)')
    .limit(8)
    .order('created_at', { ascending: false });

  const { data: pcBuilderSlides } = await supabase
    .from('pc_builder_slides')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  const mainWaNumber = '94777539333';

  return (
    <div className="flex flex-col min-h-screen bg-[#050811] selection:bg-primary/30">
      <ScrollToTop />
      
      {/* Cinematic Hero */}
      <Hero 
        slides={slides || []} 
        settings={{
          hero_title: settingsData?.hero_title,
          hero_subtitle: settingsData?.hero_subtitle,
          hero_video_url: settingsData?.hero_video_url
        }} 
      />

      {/* Hero Video Hub */}
      <HeroVideo videos={heroVideos || []} />

      {/* Lab Intel Feed */}
      <HeroSubPosts posts={subPosts || []} />

      {/* Mission Control Trust Bar */}
      <div className="relative z-40 -mt-24 md:-mt-20 container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 p-8 md:p-14 bg-[#0a0d14]/80 backdrop-blur-3xl rounded-[3rem] md:rounded-[4rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
          <TrustItem icon={<MapPin className="w-6 h-6 md:w-8 md:h-8" />} title="ELITE NETWORK" subtitle="3 STRATEGIC BRANCHES" />
          <TrustItem icon={<ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />} title="VERIFIED TECH" subtitle="GENUINE LAB WARRANTY" />
          <TrustItem icon={<Zap className="w-6 h-6 md:w-8 md:h-8" />} title="RAPID ALLOCATION" subtitle="PRIORITY ISLAND DELIVERY" />
          <TrustItem icon={<Terminal className="w-6 h-6 md:w-8 md:h-8" />} title="LAB CERTIFIED" subtitle="EXPERT CONFIGURATIONS" />
        </div>
      </div>

      {/* Production Reels */}
      {reels && reels.length > 0 && <VideoReels reels={reels} />}

      {/* Segment Distribution - Immersive Grid */}
      <section className="py-48 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/5 blur-[180px] rounded-full -mr-96 -mt-96 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-32 space-y-6">
            <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 shadow-2xl">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic">ELITE INVENTORY SECTORS</span>
            </div>
            <h2 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.8] uppercase italic">
              LAB <span className="text-primary italic">SEGMENTS</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { 
                id: 'workstations', 
                title: 'ELITE RIGS', 
                desc: 'Uncompromising architecture for engineering and extreme gaming production.',
                image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2070&auto=format&fit=crop'
              },
              { 
                id: 'flagships', 
                title: 'CORE MOBILE', 
                desc: 'Latest global flagship smartphones and mobile ecosystem deployments.',
                image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2070&auto=format&fit=crop'
              },
              { 
                id: 'components', 
                title: 'MODULE CORE', 
                desc: 'Precision GPU, CPU, and specialized hardware modules for custom blueprints.',
                image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2070&auto=format&fit=crop'
              }
            ].map(tier => {
              const dbCat = featuredCategories?.find(c => c.inventory_type === tier.id);
              return (
                <CategoryCard 
                  key={tier.id}
                  title={dbCat?.name || tier.title}
                  desc={dbCat?.description || tier.desc}
                  image={dbCat?.image_url || tier.image}
                  href={`/products?inventory=${tier.id}`}
                  stats="ACCESS SECTOR"
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Lab Verification - Reviews Section */}
      <ReviewsSection reviews={reviews || []} />

      {/* Precision Engineering - Services */}
      <section className="py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[200px] rounded-full -left-96 pointer-events-none" />
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-12">
              <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20">
                <Settings className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic">LAB CAPABILITIES</span>
              </div>
              <h2 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.8] uppercase italic">
                TECHNICAL <br /><span className="text-primary italic">AUTHORITY.</span>
              </h2>
              <p className="text-xl text-slate-500 font-black uppercase tracking-tight italic leading-relaxed max-w-xl">
                OZONE LABS PROVIDES ADVANCED TECHNICAL PROTOCOLS INCLUDING PROFESSIONAL ARCHITECTURE DESIGN, EXTREME REPAIRS, AND SECURITY INFRASTRUCTURE.
              </p>
              <Link href="/services" className="inline-flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-white group italic">
                ALL LAB PROTOCOLS
                <div className="w-16 h-16 rounded-[1.5rem] border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_20px_40px_rgba(239,68,68,0.4)] transition-all duration-500 transform group-hover:rotate-12">
                  <ArrowRight className="w-8 h-8" />
                </div>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {services?.map((service) => (
                <div key={service.id} className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 hover:border-primary/40 transition-all duration-700 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-3xl pointer-events-none" />
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-2xl">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter italic group-hover:text-primary transition-colors">{service.title}</h4>
                  <p className="text-sm text-slate-600 font-black uppercase tracking-tight italic leading-relaxed line-clamp-2">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Partners - Infinite Scroll */}
      <section className="py-20 bg-white overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />
        
        <div className="container mx-auto px-6 mb-10">
          <p className="text-center text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] italic">GLOBAL PRODUCTION PARTNERS</p>
        </div>

        <div className="flex overflow-hidden group">
          <div className="flex gap-32 items-center animate-marquee whitespace-nowrap py-6">
            {(partners && partners.length > 0 ? partners : [
              { id: 'p1', name: 'Intel' }, { id: 'p2', name: 'Nvidia' }, { id: 'p3', name: 'Asus' }, { id: 'p4', name: 'Apple' }, { id: 'p5', name: 'Samsung' }
            ]).map((partner) => (
              <BrandLogoClient key={partner.id} name={partner.name} logo={(partner as {logo_url?: string}).logo_url} />
            ))}
            {(partners && partners.length > 0 ? partners : [
              { id: 'p1', name: 'Intel' }, { id: 'p2', name: 'Nvidia' }, { id: 'p3', name: 'Asus' }, { id: 'p4', name: 'Apple' }, { id: 'p5', name: 'Samsung' }
            ]).map((partner) => (
              <BrandLogoClient key={`dup-${partner.id}`} name={partner.name} logo={(partner as {logo_url?: string}).logo_url} />
            ))}
          </div>
        </div>
      </section>

      {/* Fresh Intake - New Arrivals */}
      <section className="py-48 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[200px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-4 px-5 py-2 rounded-full bg-primary/10 border border-primary/20">
                 <Activity className="w-4 h-4 text-primary animate-pulse" />
                 <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] italic">LATEST ALLOCATIONS</span>
              </div>
              <h2 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase italic leading-[0.8]">FRESH <br /><span className="text-primary italic">INTAKE</span></h2>
            </div>
            <Link href="/products" className="inline-flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-all duration-500 group italic">
              FULL INVENTORY SCAN
              <div className="w-16 h-16 rounded-[1.5rem] border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-2xl">
                <ChevronRight className="w-7 h-7" />
              </div>
            </Link>
          </div>
        </div>
        
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {featuredProductsWithCat?.map((product) => (
              <Link href={`/products?id=${product.id}`} key={product.id} className="group block">
                <div className="aspect-[4/5] relative rounded-[4rem] overflow-hidden bg-white/[0.02] border border-white/10 group-hover:border-primary/50 transition-all duration-1000 shadow-[0_30px_60px_rgba(0,0,0,0.6)] group-hover:shadow-primary/20">
                  <Image src={product.image_url} alt={product.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover opacity-60 transition-transform duration-[2000ms] group-hover:scale-110 group-hover:opacity-90 grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-10 left-10 right-10 space-y-4">
                     <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em] italic block">{product.categories?.name || 'UNIT'}</span>
                     <h3 className="text-2xl font-black text-white leading-[0.9] group-hover:text-primary transition-colors line-clamp-2 uppercase italic tracking-tighter">{product.name}</h3>
                     <div className="text-xl font-black text-white tracking-widest italic pt-2">Rs. {product.price.toLocaleString()}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Peripheral Ecosystem */}
      <TrendingAccessories products={accessories?.map(a => ({ ...a, category: a.categories })) || []} />

      {/* Blueprint Laboratory - PC Builder Slider */}
      <PCBuilderSlider 
        slides={pcBuilderSlides || []} 
        settings={{
          pc_builder_title: settingsData?.pc_builder_title,
          pc_builder_subtitle: settingsData?.pc_builder_subtitle
        }}
      />

      {/* Technical Queries - FAQ */}
      <section className="py-48 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/2 blur-[250px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <div className="text-center mb-32 space-y-6">
            <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 italic">
              <HelpCircle className="w-4 h-4 text-slate-700" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-700">TECHNICAL QUERIES</span>
            </div>
            <h2 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase italic leading-[0.8]">BLUEPRINT <br /><span className="text-primary italic">INTEL</span></h2>
          </div>

          <div className="space-y-6">
            {faqs?.map((faq) => (
              <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Support Protocol - Final CTA */}
      <section className="py-48 bg-[#050811] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-[0.03] z-0">
           <span className="text-[20vw] font-black text-white uppercase italic tracking-tighter leading-none select-none">CONTACT</span>
        </div>
        
        <div className="container mx-auto px-6 text-center space-y-20 relative z-10">
          <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase italic leading-none">ELITE <span className="text-primary italic">SUPPORT.</span></h2>
          <div className="flex flex-col lg:flex-row justify-center items-center gap-12">
            <Link 
              href={`https://wa.me/${mainWaNumber}`}
              className="h-24 px-16 bg-primary text-white font-black uppercase tracking-[0.3em] rounded-[2.5rem] flex items-center gap-6 hover:shadow-[0_20px_60px_rgba(239,68,68,0.5)] transition-all duration-500 transform hover:-translate-y-2 italic group"
            >
              <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
              Direct Lab Link
            </Link>
            <div className="hidden lg:flex items-center gap-6 px-10 py-4 bg-white/5 rounded-full border border-white/5 italic">
               <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
               <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.5em]">OPERATORS ONLINE</span>
            </div>
            <Link 
              href={`tel:${mainWaNumber}`}
              className="h-24 px-16 bg-white/[0.03] border border-white/10 text-white font-black uppercase tracking-[0.3em] rounded-[2.5rem] flex items-center gap-6 hover:bg-white/[0.08] hover:border-primary/50 transition-all duration-500 transform hover:-translate-y-2 italic group shadow-2xl"
            >
              <Phone className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
              Central Node: {mainWaNumber.replace('94', '0')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function TrustItem({ icon, title, subtitle }: { icon: React.ReactNode, title: string, subtitle: string }) {
  return (
    <div className="flex items-center gap-6 md:gap-8 group">
      <div className="w-14 h-14 md:w-20 md:h-20 shrink-0 rounded-[1.5rem] bg-white/[0.03] text-primary flex items-center justify-center border border-white/10 transition-all duration-700 group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-[0_20px_40px_rgba(239,68,68,0.4)] shadow-xl">
        {icon}
      </div>
      <div className="flex flex-col min-w-0 space-y-1">
        <span className="text-white font-black text-[11px] md:text-lg uppercase tracking-tighter italic truncate leading-none">{title}</span>
        <span className="text-slate-600 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] italic truncate">{subtitle}</span>
      </div>
    </div>
  );
}

function CategoryCard({ title, desc, image, href, stats }: { title: string, desc: string, image: string, href: string, stats: string }) {
  return (
    <Link href={href} className="group relative h-[750px] rounded-[5rem] overflow-hidden bg-[#0a0d14] border border-white/10 hover:border-primary/50 transition-all duration-1000 shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
      <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover opacity-40 transition-transform duration-[3000ms] group-hover:scale-110 group-hover:opacity-70 grayscale group-hover:grayscale-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent opacity-90" />
      
      <div className="absolute bottom-0 left-0 p-14 md:p-20 space-y-10 w-full z-10">
        <div className="flex items-center gap-4">
           <div className="px-6 py-2.5 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-xl border border-primary/20 italic">{stats}</div>
           <Activity className="w-5 h-5 text-primary/50 animate-pulse" />
        </div>
        <div className="space-y-4">
           <h3 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-none group-hover:text-primary transition-colors uppercase italic">{title}</h3>
           <p className="text-slate-500 font-black text-sm md:text-lg leading-relaxed max-w-sm uppercase italic tracking-tight">{desc}</p>
        </div>
        <div className="pt-6">
          <div className="w-20 h-20 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] flex items-center justify-center text-white group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 shadow-2xl group-hover:shadow-primary/40">
            <ArrowRight className="w-10 h-10" />
          </div>
        </div>
      </div>
    </Link>
  )
}

function Phone(props: any) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
