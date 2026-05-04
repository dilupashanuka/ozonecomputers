'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Terminal } from 'lucide-react';

export function BrandLogoClient({ name, logo }: { name: string, logo?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative h-20 w-48 flex items-center justify-center shrink-0 group">
      {/* Name — always visible until image loads, permanent if no logo / error */}
      <div
        className={`flex items-center gap-3 transition-all duration-1000 ${
          isLoaded && !hasError ? 'opacity-0 scale-90 pointer-events-none absolute' : 'opacity-100 scale-100'
        }`}
      >
        <Terminal className="w-5 h-5 text-slate-800" />
        <span className="text-2xl font-black text-slate-800 uppercase tracking-tighter select-none italic">
          {name}
        </span>
      </div>

      {/* Image — only mount when we have a URL and no error yet */}
      {logo && !hasError && (
        <div
          className={`absolute inset-0 transition-all duration-[1.5s] grayscale group-hover:grayscale-0 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-125'
          }`}
        >
          <Image
            src={logo}
            alt={name}
            fill
            sizes="192px"
            className="object-contain transition-transform duration-1000 group-hover:scale-110 drop-shadow-2xl"
            loading="eager"
            unoptimized
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
          />
        </div>
      )}

      {/* Lab UI Element */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary/20 group-hover:w-full group-hover:bg-primary transition-all duration-1000" />
    </div>
  );
}
