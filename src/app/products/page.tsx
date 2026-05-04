import { createClient } from '@/utils/supabase/server';
import { ShoppingCart, Search, Grid, List, ChevronDown, Sparkles, Activity, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/components/shop/ProductCard';
import { ShopSidebar } from '@/components/shop/ShopSidebar';
import { MobileFilter } from '@/components/shop/MobileFilter';
import { SortDropdown } from '@/components/shop/SortDropdown';
import { SearchInput } from '@/components/shop/SearchInput';
import { InventoryHeader } from '@/components/shop/InventoryHeader';
import { ProductGridClient } from '@/components/shop/ProductGridClient';
import { CategoryNavigator } from '@/components/shop/CategoryNavigator';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Operational Inventory | OZONE LABS',
  description: 'Analyze the elite tech inventory of OZONE LABS. From high-impact hardware architecture to mission-critical infrastructure across our 3 strategic nodes.',
  keywords: 'buy computers Sri Lanka, laptops Kamburupitiya, CCTV Embilipitiya, gaming PC Deiyandara, Ozone Labs, Ozone Computers',
};

export const revalidate = 0;

const PAGE_SIZE = 12;

export default async function ProductsPage(props: {
  searchParams: Promise<{ 
    category?: string; 
    sort?: string; 
    inventory?: string;
    min?: string;
    max?: string;
    search?: string;
    page?: string;
    brand?: string;
    [key: string]: string | undefined;
  }>;
}) {
  const resolvedSearchParams = await props.searchParams;
  const category = resolvedSearchParams.category;
  const sort = resolvedSearchParams.sort || 'latest';
  const inventory = resolvedSearchParams.inventory;
  const min = resolvedSearchParams.min ? Number(resolvedSearchParams.min) : undefined;
  const max = resolvedSearchParams.max ? Number(resolvedSearchParams.max) : undefined;
  const search = resolvedSearchParams.search || '';
  const page = resolvedSearchParams.page ? Number(resolvedSearchParams.page) : 1;
  const offset = (page - 1) * PAGE_SIZE;
  
  const supabase = await createClient();
  const { data: categories } = await supabase.from('categories').select('*').order('name');
  const { data: slides } = await supabase.from('inventory_slides').select('*').order('created_at', { ascending: false });
  const { data: headerSettings } = await supabase.from('site_settings').select('*').eq('id', 'inventory_header_text').single();
  
  // 1. Fetch products for the current inventory to extract specifications
  let specQuery = supabase.from('products').select('specifications, brand');
  if (inventory) specQuery = specQuery.eq('inventory_type', inventory);
  const { data: allProductsForSpecs } = await specQuery;

  const availableSpecs: Record<string, Set<string>> = {};
  const availableBrands = new Set<string>();

  allProductsForSpecs?.forEach(p => {
    if (p.brand) {
      availableBrands.add(p.brand);
    }
    if (p.specifications) {
      Object.entries(p.specifications as Record<string, string>).forEach(([key, value]) => {
        if (!availableSpecs[key]) availableSpecs[key] = new Set();
        availableSpecs[key].add(value);
      });
    }
  });

  const formattedAvailableSpecs = Object.entries(availableSpecs).reduce((acc, [key, values]) => {
    acc[key] = Array.from(values).sort();
    return acc;
  }, {} as Record<string, string[]>);

  const formattedAvailableBrands = Array.from(availableBrands).sort();

  // 2. Build the main query
  let query = supabase.from('products').select('*', { count: 'exact' });
  
  if (inventory) {
    query = query.eq('inventory_type', inventory);
  }
  
  if (category) {
    const selectedCategory = categories?.find(c => c.slug === category);
    if (selectedCategory) {
      const children = categories?.filter(c => c.parent_id === selectedCategory.id) || [];
      const ids = [selectedCategory.id, ...children.map(c => c.id)];
      query = query.in('category_id', ids);
    } else {
      query = query.eq('category', category);
    }
  }

  // Handle Brand Filter
  if (resolvedSearchParams.brand) {
    query = query.eq('brand', resolvedSearchParams.brand);
  }

  // Handle Dynamic Spec Filters
  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
    if (key.startsWith('spec_')) {
      const specKey = key.replace('spec_', '');
      query = query.contains('specifications', { [specKey]: value });
    }
  });

  // Handle Search
  if (search) {
    query = query.or(`title.ilike.%${search}%,brand.ilike.%${search}%`);
  }

  if (min !== undefined) {
    query = query.gte('price', min);
  }
  if (max !== undefined) {
    query = query.lte('price', max);
  }

  if (sort === 'price-low') query = query.order('price', { ascending: true });
  else if (sort === 'price-high') query = query.order('price', { ascending: false });
  else if (sort === 'oldest') query = query.order('created_at', { ascending: true });
  else if (sort === 'name-az') query = query.order('name', { ascending: true });
  else if (sort === 'name-za') query = query.order('name', { ascending: false });
  else query = query.order('created_at', { ascending: false });

  // Count total for pagination
  // Pagination is applied below

  // Apply pagination
  query = query.range(offset, offset + PAGE_SIZE - 1);
  
  const { data: products, count: totalCount } = await query;

  const mappedProducts = products?.map(p => ({
    ...p,
    title: p.name || p.title,
    image_url: p.image || p.image_url,
    price: typeof p.price === 'string' ? parseFloat(p.price) : p.price,
    description: p.description || (p.specifications ? Object.entries(p.specifications).map(([k, v]) => `${k}: ${v}`).join(', ') : ''),
    category: categories?.find(c => c.id === p.category_id)?.name || p.category || 'Uncategorized'
  })) || [];

  return (
    <div className="min-h-screen bg-[#050811] pb-40">
      <InventoryHeader slides={slides || []} settings={headerSettings} />

      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        {/* Category Navigator for Inventory Entry */}
        {inventory && !category && (
          <CategoryNavigator categories={categories || []} currentInventory={inventory} />
        )}

        {/* Modern Control Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-20 p-8 bg-white/[0.02] border border-white/5 rounded-[3.5rem] relative z-20 shadow-2xl backdrop-blur-3xl">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-primary shadow-2xl">
               <Activity className="w-7 h-7" />
            </div>
            <SearchInput />
          </div>

          <div className="flex flex-wrap items-center gap-6">
             <MobileFilter 
               currentCategory={category} 
               categories={categories || []} 
               availableSpecs={formattedAvailableSpecs}
               availableBrands={formattedAvailableBrands}
             />
             <div className="w-px h-10 bg-white/5 hidden sm:block" />
             <SortDropdown currentSort={sort} />
             <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-800">
                <Terminal className="w-7 h-7" />
             </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar */}
          <aside className="hidden lg:block w-80 shrink-0">
            <ShopSidebar 
              currentCategory={category} 
              categories={categories || []} 
              availableSpecs={formattedAvailableSpecs}
              availableBrands={formattedAvailableBrands}
            />
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGridClient products={mappedProducts} />

            {/* Pagination */}
            {totalCount && totalCount > offset + PAGE_SIZE && (
              <div className="mt-32 flex justify-center">
                <a
                  href={`?${new URLSearchParams({ ...Object.fromEntries(Object.entries(resolvedSearchParams).map(([k, v]) => [k, String(v)])), page: String(page + 1) }).toString()}`}
                  className="group px-20 h-24 bg-primary rounded-[1.5rem] text-xs font-black uppercase tracking-[0.4em] text-white hover:shadow-[0_20px_50px_rgba(239,68,68,0.5)] transition-all duration-700 transform hover:-translate-y-2 italic flex items-center gap-6"
                >
                  INITIALIZE NEXT SCAN ({totalCount - (offset + PAGE_SIZE)} UNITS)
                  <Activity className="w-6 h-6 group-hover:rotate-180 transition-transform duration-1000" />
                </a>
              </div>
            )}
            
            {products && products.length === 0 && (
              <div className="py-48 flex flex-col items-center justify-center gap-10 text-center bg-white/[0.01] rounded-[4rem] border border-white/5 border-dashed">
                <div className="w-24 h-24 rounded-[2rem] bg-white/[0.03] flex items-center justify-center text-slate-800">
                   <ShoppingCart className="w-12 h-12" />
                </div>
                <div className="space-y-4">
                   <p className="text-slate-500 font-black uppercase tracking-[0.5em] text-2xl italic leading-none">NO INVENTORY DETECTED</p>
                   <p className="text-slate-700 text-[10px] font-black uppercase tracking-[0.3em] italic">RECONFIGURE SCAN FILTERS OR SEARCH PARAMETERS</p>
                </div>
                <Button 
                   onClick={() => window.location.href = '/products'}
                   variant="outline" 
                   className="h-16 px-10 border-white/10 bg-white/5 font-black uppercase tracking-[0.3em] italic text-xs rounded-2xl"
                >
                   RESET SCAN CORE
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
