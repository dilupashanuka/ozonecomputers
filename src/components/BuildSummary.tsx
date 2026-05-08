// src/components/BuildSummary.tsx
'use client';

import React from 'react';
import { useBuildStore } from '@/store/buildStore';
import { Category } from '@/types';

const categoryLabels: Record<Category, string> = {
  cpu: 'CPU',
  motherboard: 'Motherboard',
  gpu: 'GPU',
  ram: 'RAM',
  storage: 'Storage',
  psu: 'PSU',
  case: 'Case'
};

const BuildSummary: React.FC = () => {
  const { parts, errors, resetBuild } = useBuildStore();

  return (
    <div className="p-5 border border-slate-700 rounded-lg bg-slate-900 my-4 shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-cyan-400">ඔබේ ගොඩනැගූ දේ (Build Summary)</h2>

      {/* ගැලපීම් දෝෂ */}
      {errors.length > 0 && (
        <div className="bg-red-900/30 border border-red-500/50 text-red-300 p-3 rounded mb-4">
          <strong className="block mb-1 text-red-400">ගැලපෙන්නේ නැත:</strong>
          <ul className="list-disc list-inside text-sm">
            {errors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </div>
      )}

      {/* තෝරූ කොටස් */}
      <div className="space-y-2">
        {Object.entries(parts).map(([category, product]) => (
          <div key={category} className="flex items-center py-2 border-b border-slate-800 last:border-0">
            <span className="min-w-[120px] font-bold text-slate-400">
              {categoryLabels[category as Category]}:
            </span>
            <span className="text-slate-100">{product?.name}</span>
          </div>
        ))}
        {Object.keys(parts).length === 0 && (
          <p className="text-slate-500 italic text-sm py-4">තවමත් කිසිදු කොටසක් තෝරා නැත.</p>
        )}
      </div>

      <button 
        onClick={resetBuild} 
        className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded transition text-sm font-bold"
      >
        නැවත ආරම්භ කරන්න
      </button>
    </div>
  );
};

export default BuildSummary;
