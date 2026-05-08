// src/app/builder/page.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useBuildStore } from '@/store/buildStore';
import { getAllProducts, Product, Category } from '@/lib/mockApi';
import { CheckCircle, AlertTriangle, ShoppingCart, Trash2, Cpu, Monitor, MemoryStick, HardDrive, Power, Box, LayoutGrid, Save } from 'lucide-react';
import CheckoutModal from '@/components/CheckoutModal';

// Category Icons Map
const categoryIcons: Record<Category, any> = {
  cpu: Cpu,
  motherboard: LayoutGrid,
  gpu: Monitor,
  ram: MemoryStick,
  storage: HardDrive,
  psu: Power,
  case: Box,
};

const categoryLabels: Record<Category, string> = {
  cpu: 'ප්රොසෙසරය (CPU)',
  motherboard: 'මදර්බෝඩ්',
  gpu: 'ග්රැෆික්ස් කාඩ් (GPU)',
  ram: 'මතකය (RAM)',
  storage: 'ගබඩාව (SSD/HDD)',
  psu: 'පවර් සප්ලයි (PSU)',
  case: 'කේස් එක (Case)',
};

export default function PCBuilderPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('cpu');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const { parts, addPart, removePart, errors, buildName, updateBuildName, resetBuild } = useBuildStore();

  useEffect(() => {
    setLoading(true);
    getAllProducts().then(data => {
      setAllProducts(data);
      setLoading(false);
    });
  }, []);

  // තෝරාගත් කාණ්ඩයේ නිෂ්පාදන ලබා ගැනීම සහ මිල අනුව පෙරහන් දැමීම
  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => 
      p.category === selectedCategory && 
      p.price >= priceRange[0] && 
      p.price <= priceRange[1]
    );
  }, [selectedCategory, priceRange, allProducts]);

  // මුළු මිල ගණනය කිරීම
  const totalPrice = Object.values(parts).reduce((sum, part) => sum + (part?.price || 0), 0);

  // වර්තමාන තෝරාගත් භාණ්ඩය පරීක්ෂා කිරීම (Highlight කිරීම සඳහා)
  const selectedProductInList = parts[selectedCategory];

  // Save/Load Handlers
  const handleSave = () => {
    if (Object.keys(parts).length === 0) {
      alert("සුරැකීමට කොටස් තෝරා නැත!");
      return;
    }
    alert(`"${buildName}" සාර්ථකව සුරැකිණි! (Browser Local Storage)`);
  };

  const handleClearSaved = () => {
    if(confirm("සුරැකූ සියලු දත්ත මකා දැමීමට අවශ්ය බව විශ්වාසද?")) {
      localStorage.removeItem('nano-build-storage');
      resetBuild();
      alert("දත්ත මකා දමන ලදී.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Dynamic Header for Builder */}
      <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 p-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <h1 className="text-2xl font-black text-blue-500 tracking-tighter">NanoBuild</h1>
            <div className="h-6 w-px bg-gray-800 hidden md:block"></div>
            <input 
              type="text" 
              value={buildName}
              onChange={(e) => updateBuildName(e.target.value)}
              className="bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none w-full md:w-64 transition-all"
              placeholder="Build Name..."
            />
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
             {/* Save/Load Actions */}
             <div className="flex items-center gap-2 pr-4 border-r border-gray-800">
               <button onClick={handleSave} title="සුරකින්න" className="p-2.5 bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white rounded-xl transition-all active:scale-95 border border-gray-700">
                <Save size={20} />
              </button>
              <button onClick={handleClearSaved} title="සුරැකූ දත්ත මකන්න" className="p-2.5 bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white rounded-xl transition-all active:scale-95 border border-gray-700">
                <Trash2 size={20} />
              </button>
             </div>

            <div className="text-right">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Total Build</p>
              <p className="text-xl font-black text-green-400 leading-none">Rs. {totalPrice.toLocaleString()}</p>
            </div>
            
            <button 
              onClick={() => setIsCheckoutOpen(true)}
              disabled={Object.keys(parts).length === 0}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all font-bold shadow-lg shadow-blue-900/20 active:scale-95"
            >
              <ShoppingCart size={18} /> ඇණවුම් කරන්න
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 p-4 py-8">
        
        {/* Left Sidebar: Categories */}
        <aside className="w-full md:w-72 flex-shrink-0">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800 sticky top-24 shadow-2xl">
            <h2 className="text-lg font-bold mb-6 text-blue-400 border-b border-gray-800 pb-3 uppercase tracking-wider">කොටස් තෝරන්න</h2>
            <nav className="space-y-3">
              {(Object.keys(categoryLabels) as Category[]).map((cat) => {
                const Icon = categoryIcons[cat];
                const isSelected = selectedCategory === cat;
                const hasPart = !!parts[cat];
                const isError = errors.some(e => e.toLowerCase().includes(cat));

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 group ${
                      isSelected 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 translate-x-1' 
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white border border-transparent hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Icon size={22} className={isSelected ? 'text-white' : 'text-blue-500 group-hover:text-blue-400'} />
                      <span className="text-sm font-semibold">{categoryLabels[cat]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {hasPart && !isError && <CheckCircle size={18} className="text-green-400" />}
                      {isError && <AlertTriangle size={18} className="text-red-500" />}
                    </div>
                  </button>
                );
              })}
            </nav>

            {/* Selected Parts Summary in Sidebar */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest">සාරාංශය</h3>
              <div className="space-y-4">
                {Object.entries(parts).map(([cat, product]) => (
                  <div key={cat} className="flex justify-between items-start gap-3 group/item">
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-blue-500 font-bold uppercase">{categoryLabels[cat as Category].split(' ')[0]}</span>
                      <span className="text-xs text-gray-200 truncate block font-medium group-hover/item:text-white transition-colors">{product?.name}</span>
                    </div>
                    <button 
                      onClick={() => removePart(cat as Category)} 
                      className="text-gray-600 hover:text-red-500 transition-colors p-1 hover:bg-red-500/10 rounded"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                {Object.keys(parts).length === 0 && (
                  <p className="text-gray-600 text-xs italic py-2">තවම කොටස් තෝරා නැත.</p>
                )}
              </div>
            </div>
            
            {/* Global Errors */}
            {errors.length > 0 && (
              <div className="mt-6 bg-red-950/40 border border-red-900/50 p-4 rounded-xl backdrop-blur-sm">
                <h4 className="text-red-500 text-xs font-black mb-2 flex items-center gap-2 uppercase">
                  <AlertTriangle size={14} /> ගැලපීම් ගැටලු
                </h4>
                <ul className="text-red-300 text-[11px] list-disc pl-4 space-y-2 leading-relaxed">
                  {errors.map((err, i) => <li key={i}>{err}</li>)}
                </ul>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content: Product List & Filters */}
        <main className="flex-1">
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
              <div>
                <h2 className="text-3xl font-black mb-1">{categoryLabels[selectedCategory]}</h2>
                <p className="text-gray-400 text-sm">ඔබට ගැලපෙන හොඳම {categoryLabels[selectedCategory]} තෝරාගන්න.</p>
              </div>
              
              {/* Price Filter */}
              <div className="w-full sm:w-72 bg-gray-950/50 p-4 rounded-2xl border border-gray-800">
                <label className="text-xs text-blue-400 font-bold uppercase tracking-widest block mb-3">මිල පරාසය</label>
                <input 
                  type="range" 
                  min="0" 
                  max="500000" 
                  step="5000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-2 font-bold uppercase">
                  <span>Rs. 0</span>
                  <span className="text-blue-400">Rs. {priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full py-20 text-center">
                  <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-500 font-medium italic">දත්ත ලෝඩ් වෙමින් පවතී...</p>
                </div>
              ) : (
                filteredProducts.map((product) => {
                  const isSelected = selectedProductInList?.id === product.id;
                  
                  return (
                    <div 
                      key={product.id}
                      onClick={() => isSelected ? removePart(selectedCategory) : addPart(selectedCategory, product)}
                      className={`group relative border-2 rounded-2xl p-5 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl ${
                        isSelected 
                          ? 'border-blue-600 bg-blue-900/10 shadow-blue-900/20' 
                          : 'border-gray-800 bg-gray-900/50 hover:border-blue-900/50 hover:bg-gray-800/80'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute -top-3 -right-3 bg-blue-600 text-white rounded-full p-1 border-4 border-gray-900 shadow-lg">
                          <CheckCircle size={20} />
                        </div>
                      )}
                      
                      <div className="h-44 bg-gray-950 rounded-2xl mb-5 flex items-center justify-center overflow-hidden border border-gray-800 group-hover:border-blue-900/30 transition-colors">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110" 
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="font-bold text-base leading-tight group-hover:text-blue-400 transition-colors line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                        <p className="text-[11px] text-gray-500 font-medium uppercase tracking-tight">
                          {product.brand} • {product.specs ? Object.entries(product.specs).map(([k,v]) => `${k}: ${v}`).join(', ') : ''}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-800 group-hover:border-blue-900/20">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-gray-500 uppercase font-bold">මිල</span>
                          <span className="text-green-400 font-black text-lg">Rs. {product.price.toLocaleString()}</span>
                        </div>
                        <div className={`text-xs px-4 py-2 rounded-xl font-black uppercase transition-all ${
                          isSelected ? 'bg-red-600/20 text-red-500 border border-red-500/30 group-hover:bg-red-600 group-hover:text-white' : 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                        }`}>
                          {isSelected ? 'ඉවත් කරන්න' : 'තෝරන්න'}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              
              {!loading && filteredProducts.length === 0 && (
                <div className="col-span-full text-center py-24 bg-gray-950/50 rounded-3xl border border-dashed border-gray-800">
                  <Monitor size={48} className="mx-auto text-gray-700 mb-4 opacity-50" />
                  <p className="text-gray-500 font-bold text-lg">මෙම මිල පරාසයට හෝ ප්‍රවර්ගයට ගැලපෙන නිෂ්පාදන සොයාගත නොහැක.</p>
                  <button 
                    onClick={() => setPriceRange([0, 500000])}
                    className="mt-4 text-blue-500 hover:text-blue-400 font-bold underline"
                  >
                    සියලු නිෂ්පාදන පෙන්වන්න
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  );
}
