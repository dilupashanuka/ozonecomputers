// src/lib/mockApi.ts
import { Product, Category } from '@/types';

export type { Product, Category };

// සැබෑ නිෂ්පාදන දත්ත (Realistic Product Data)
const products: Product[] = [
  // CPUs
  {
    id: 'cpu-001',
    name: 'Intel Core i5-13600K',
    category: 'cpu',
    price: 115000,
    brand: 'Intel',
    image: 'https://m.media-amazon.com/images/I/61S+R9qW+WL._AC_SL1500_.jpg',
    specs: { socket: 'LGA1700', cores: '14', threads: '20', clock: '3.5GHz' },
    inStock: true,
    rating: 4.8
  },
  {
    id: 'cpu-002',
    name: 'AMD Ryzen 7 7800X3D',
    category: 'cpu',
    price: 145000,
    brand: 'AMD',
    image: 'https://m.media-amazon.com/images/I/51yT+pE+y+L._AC_SL1000_.jpg',
    specs: { socket: 'AM5', cores: '8', threads: '16', cache: '96MB L3' },
    inStock: true,
    rating: 4.9
  },
  {
    id: 'cpu-003',
    name: 'Intel Core i9-14900K',
    category: 'cpu',
    price: 195000,
    brand: 'Intel',
    image: 'https://m.media-amazon.com/images/I/61bK6YQhSGL._AC_SL1500_.jpg',
    specs: { socket: 'LGA1700', cores: '24', threads: '32', clock: '6.0GHz' },
    inStock: true,
    rating: 4.7
  },

  // Motherboards
  {
    id: 'mobo-001',
    name: 'MSI MAG B760 Tomahawk WiFi',
    category: 'motherboard',
    price: 65000,
    brand: 'MSI',
    image: 'https://m.media-amazon.com/images/I/81S6U8A6XdL._AC_SL1500_.jpg',
    specs: { socket: 'LGA1700', chipset: 'B760', form: 'ATX', ram: 'DDR5' },
    inStock: true,
    rating: 4.6
  },
  {
    id: 'mobo-002',
    name: 'ASUS ROG STRIX X670E-E GAMING WIFI',
    category: 'motherboard',
    price: 155000,
    brand: 'ASUS',
    image: 'https://m.media-amazon.com/images/I/81U6U8A6XdL._AC_SL1500_.jpg',
    specs: { socket: 'AM5', chipset: 'X670E', form: 'ATX', ram: 'DDR5' },
    inStock: true,
    rating: 4.9
  },

  // GPUs
  {
    id: 'gpu-001',
    name: 'NVIDIA GeForce RTX 4070 Ti',
    category: 'gpu',
    price: 285000,
    brand: 'NVIDIA',
    image: 'https://m.media-amazon.com/images/I/71X8k6eQ6tL._AC_SL1500_.jpg',
    specs: { vram: '12GB GDDR6X', power: '285W', interface: 'PCIe 4.0' },
    inStock: true,
    rating: 4.8
  },
  {
    id: 'gpu-002',
    name: 'AMD Radeon RX 7900 XTX',
    category: 'gpu',
    price: 325000,
    brand: 'AMD',
    image: 'https://m.media-amazon.com/images/I/81U6U8A6XdL._AC_SL1500_.jpg',
    specs: { vram: '24GB GDDR6', power: '355W', interface: 'PCIe 4.0' },
    inStock: true,
    rating: 4.7
  },

  // RAM
  {
    id: 'ram-001',
    name: 'Corsair Vengeance RGB 32GB (2x16GB)',
    category: 'ram',
    price: 45000,
    brand: 'Corsair',
    image: 'https://m.media-amazon.com/images/I/61k7J6N1kSL._AC_SL1500_.jpg',
    specs: { type: 'DDR5', speed: '6000MHz', latency: 'CL36' },
    inStock: true,
    rating: 4.8
  },

  // Storage
  {
    id: 'storage-001',
    name: 'Samsung 990 Pro 2TB NVMe SSD',
    category: 'storage',
    price: 68000,
    brand: 'Samsung',
    image: 'https://m.media-amazon.com/images/I/61k7J6N1kSL._AC_SL1500_.jpg',
    specs: { interface: 'NVMe Gen4', capacity: '2TB', speed: '7450MB/s' },
    inStock: true,
    rating: 4.9
  },

  // PSU
  {
    id: 'psu-001',
    name: 'Corsair RM850x 850W 80+ Gold',
    category: 'psu',
    price: 52000,
    brand: 'Corsair',
    image: 'https://m.media-amazon.com/images/I/61k7J6N1kSL._AC_SL1500_.jpg',
    specs: { wattage: '850W', efficiency: '80+ Gold', modular: 'Full' },
    inStock: true,
    rating: 4.8
  },

  // Case
  {
    id: 'case-001',
    name: 'Lian Li PC-O11 Dynamic',
    category: 'case',
    price: 48000,
    brand: 'Lian Li',
    image: 'https://m.media-amazon.com/images/I/61k7J6N1kSL._AC_SL1500_.jpg',
    specs: { form: 'ATX', color: 'Black', material: 'Tempered Glass' },
    inStock: true,
    rating: 4.9
  }
];

export const getAllProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 300);
  });
};

export const getProductsByCategory = async (category: Category): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.filter(p => p.category === category));
    }, 200);
  });
};

export const checkCompatibility = (parts: Partial<Record<string, Product | null>>): string[] => {
  const errors: string[] = [];
  const cpu = parts['cpu'];
  const motherboard = parts['motherboard'];

  if (cpu && motherboard) {
    if (cpu.specs.socket !== motherboard.specs.socket) {
      errors.push(`ගැලපෙන්නේ නැත: ${cpu.name} (${cpu.specs.socket}) සහ ${motherboard.name} (${motherboard.specs.socket}) වෙනස් Socket වර්ග වේ.`);
    }
  }

  return errors;
};
