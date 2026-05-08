// src/types/index.ts

export type Category = 'cpu' | 'motherboard' | 'gpu' | 'ram' | 'storage' | 'psu' | 'case';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  brand: string;
  image: string;
  specs: Record<string, any>; // නිෂ්පාදනයේ තාක්ෂණික විස්තර (Socket, Speed, Capacity ආදිය)
  inStock: boolean;
  rating: number;
}

// Compatibility Rules සඳහා අතුරු මුහුණත
export interface CompatibilityRule {
  componentA: Category;
  componentB: Category;
  checkFunction: (partA: any, partB: any) => boolean;
  errorMessage: string;
}
