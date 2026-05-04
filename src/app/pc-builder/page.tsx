import { createClient } from '@/utils/supabase/server';
import { PCBuilderClient } from '@/components/shop/PCBuilderClient';
import { Cpu, Activity, Terminal, Zap } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PC Builder Lab | OZONE COMPUTERS',
  description: 'Architect your elite gaming rig or professional workstation in the OZONE Lab. Custom specifications, verified compatibility, and instant allocation.',
  keywords: 'custom PC build Sri Lanka, OZONE computers PC builder, gaming PC build Deiyandara',
};

export const revalidate = 0;

export default async function PCBuilderPage() {
  const supabase = await createClient();

  // Safe fetch — tables may not exist yet
  let preBuilds: any[] = [];
  let products: any[] = [];
  let categoryMapping: Record<string, string | null> = {};

  let debugError = '';
  try {
    const { data, error } = await supabase
      .from('pc_builds')
      .select('*, pc_build_components(*, products(*))')
      .eq('is_active', true)
      .order('is_featured', { ascending: false });
    
    if (error) debugError = error.message;
    
    preBuilds = (data || []).map(build => ({
      ...build,
      pc_build_components: build.pc_build_components?.map((c: any) => ({
        ...c,
        products: c.products ? {
          ...c.products,
          title: c.products.name,
          image_url: c.products.image,
          description: c.products.specifications ? Object.entries(c.products.specifications).map(([k,v]) => `${k}: ${v}`).join(', ') : ''
        } : null
      }))
    }));
  } catch (e: any) { 
    preBuilds = []; 
    debugError = e.message || String(e);
  }

  try {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('in_stock', true)
      .order('name');
      
    products = (data || []).map(p => ({
      ...p,
      title: p.name,
      image_url: p.image,
      description: p.specifications ? Object.entries(p.specifications).map(([k,v]) => `${k}: ${v}`).join(', ') : ''
    }));
  } catch (e) { products = []; }

  try {
    const { data: mappings } = await supabase
      .from('pc_component_type_categories')
      .select('component_type, category_id');
    for (const m of mappings || []) {
      categoryMapping[m.component_type] = m.category_id;
    }
  } catch (e) { categoryMapping = {}; }

  return (
    <main className="min-h-screen bg-[#050811] pt-48 pb-64 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/5 blur-[200px] rounded-full -mr-96 -mt-96 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full -ml-48 -mb-48 pointer-events-none" />

      {debugError && (
        <div className="max-w-7xl mx-auto px-6 mb-24 text-primary bg-primary/10 border border-primary/20 p-12 rounded-[3rem] backdrop-blur-3xl animate-in zoom-in duration-1000 shadow-[0_0_80px_rgba(239,68,68,0.3)]">
          <div className="flex items-center gap-6 mb-6">
             <Activity className="w-8 h-8 animate-pulse text-primary" />
             <p className="font-black uppercase tracking-[0.4em] italic text-lg text-white">LABORATORY SYNC FAILURE</p>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-60 leading-relaxed italic ml-14">{debugError}</p>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-6 mb-32 text-center space-y-10 relative z-10">
        <div className="inline-flex items-center gap-6 px-10 py-4 rounded-full bg-primary/10 border border-primary/20 text-primary shadow-[0_0_50px_rgba(239,68,68,0.3)] animate-in slide-in-from-top duration-1000">
          <Cpu className="w-5 h-5 animate-pulse" /> 
          <span className="text-[11px] font-black uppercase tracking-[0.5em] italic leading-none">BLUEPRINT ARCHITECT PROTOCOL</span>
        </div>
        <h1 className="text-[5rem] md:text-[10rem] font-black text-white tracking-tighter uppercase italic leading-[0.8] drop-shadow-2xl">
          ENGINEER YOUR<br />
          <span className="text-primary italic">CORE SYSTEM</span>
        </h1>
        <div className="flex items-center justify-center gap-6 text-slate-800">
           <Terminal className="w-8 h-8" />
           <p className="text-[11px] md:text-lg max-w-2xl font-black uppercase tracking-tight italic leading-relaxed text-slate-600">
              Architect an elite configuration from our lab-verified components or select a pre-calibrated flagship system.
           </p>
        </div>
        <div className="flex items-center justify-center gap-4 text-slate-900">
           <div className="w-20 h-px bg-slate-900" />
           <Zap className="w-5 h-5 text-primary animate-pulse" />
           <div className="w-20 h-px bg-slate-900" />
        </div>
      </div>

      <div className="relative z-10">
        <PCBuilderClient
          preBuilds={preBuilds}
          products={products}
          categoryMapping={categoryMapping}
        />
      </div>
    </main>
  );
}
