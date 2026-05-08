// src/lib/mockApi.ts
export type { Product, Category } from '@/types';

// 1. නිදසුන් දත්ත (Mock Database)
const products: Product[] = [
  // CPUs
  {
    id: 'cpu-1',
    name: 'Intel Core i5-13600K',
    category: 'cpu',
    price: 48000,
    brand: 'Intel',
    image: 'https://placehold.co/400x400?text=Intel+i5',
    specs: { socket: 'LGA1700', cores: 14, threads: 20 },
    inStock: true,
    rating: 4.8,
  },
  {
    id: 'cpu-2',
    name: 'AMD Ryzen 7 7800X3D',
    category: 'cpu',
    price: 65000,
    brand: 'AMD',
    image: 'https://placehold.co/400x400?text=Ryzen+7',
    specs: { socket: 'AM5', cores: 8, threads: 16 },
    inStock: true,
    rating: 4.9,
  },
  // Motherboards
  {
    id: 'mb-1',
    name: 'ASUS ROG Strix Z790-E',
    category: 'motherboard',
    price: 85000,
    brand: 'Asus',
    image: 'https://placehold.co/400x400?text=Z790+Board',
    specs: { socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX' },
    inStock: true,
    rating: 4.7,
  },
  {
    id: 'mb-2',
    name: 'MSI MAG B650 Tomahawk',
    category: 'motherboard',
    price: 42000,
    brand: 'MSI',
    image: 'https://placehold.co/400x400?text=B650+Board',
    specs: { socket: 'AM5', chipset: 'B650', formFactor: 'ATX' },
    inStock: true,
    rating: 4.6,
  },
  // GPUs
  {
    id: 'gpu-1',
    name: 'NVIDIA GeForce RTX 4070 Ti',
    category: 'gpu',
    price: 145000,
    brand: 'NVIDIA',
    image: 'https://placehold.co/400x400?text=RTX+4070',
    specs: { vram: '12GB', length: '300mm', tdp: '285W' },
    inStock: true,
    rating: 4.8,
  },
  // RAM
  {
    id: 'ram-1',
    name: 'Corsair Vengeance 32GB DDR5',
    category: 'ram',
    price: 28000,
    brand: 'Corsair',
    image: 'https://placehold.co/400x400?text=DDR5+RAM',
    specs: { type: 'DDR5', speed: '6000MHz', capacity: '32GB' },
    inStock: true,
    rating: 4.7,
  },
];

// 2. API Functions (දත්ත ලබා ගැනීමේ ශ්රිත)

// සියලුම නිෂ්පාදන ලබා ගැනීම
export const getAllProducts = async (): Promise<Product[]> => {
  // සැබෑ ලෝකයේදී මෙහි fetch('/api/products') ලෙස වෙනස් වේ
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 500); // 500ms ප්රමාදයක් (Network simulate කිරීමට)
  });
};

// ප්රවර්ගය අනුව නිෂ්පාදන ලබා ගැනීම
export const getProductsByCategory = async (category: Category): Promise<Product[]> => {
  return new Promise((resolve) => {
    const filtered = products.filter((p) => p.category === category);
    setTimeout(() => resolve(filtered), 300);
  });
};

// 3. Compatibility Logic (ගැලපෙනවාදැයි පරීක්ෂා කිරීම)
// මෙය ඉතා වැදගත්! CPU එක Motherboard එකට ගැලපේදැයි බලයි.
export const checkCompatibility = (selectedParts: Record<string, Product | null>): string[] => {
  const errors: string[] = [];
  
  const cpu = selectedParts['cpu'];
  const motherboard = selectedParts['motherboard'];

  if (cpu && motherboard) {
    if (cpu.specs.socket !== motherboard.specs.socket) {
      errors.push(
        `ගැලපෙනවා නැත: ${cpu.name} (${cpu.specs.socket}) සහ ${motherboard.name} (${motherboard.specs.socket}) අතර Socket ගැලපෙන්නේ නැත.`
      );
    }
  }

  // මෙතැනට තවත් නීති එකතු කළ හැක (උදා: PSU බලය ප්රමාණවත්ද?, Case එකට GPU එක ගැලපේද?)
  
  return errors;
};
