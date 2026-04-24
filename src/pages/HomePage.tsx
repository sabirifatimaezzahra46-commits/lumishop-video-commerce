import React from 'react';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { VideoPost } from '@/components/VideoPost';
import { Toaster } from '@/components/ui/sonner';
export function HomePage() {
  return (
    <div className="relative w-full h-screen bg-neutral-950 flex justify-center items-center overflow-hidden">
      {/* Ambient Background for Desktop */}
      <div className="hidden lg:block absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl z-10" />
        <div className="flex w-full h-full opacity-30">
          {MOCK_PRODUCTS.slice(0, 3).map((p) => (
            <img 
              key={`bg-${p.id}`} 
              src={p.posterUrl} 
              alt="" 
              className="flex-1 object-cover" 
            />
          ))}
        </div>
      </div>
      {/* Main Feed Container */}
      <main className="relative z-10 w-full lg:max-w-[420px] lg:h-[880px] lg:rounded-[3rem] lg:border-[8px] lg:border-neutral-900 lg:shadow-2xl overflow-hidden bg-black">
        <div className="h-full w-full overflow-y-auto snap-y snap-mandatory scrollbar-hide">
          {MOCK_PRODUCTS.map((product) => (
            <VideoPost key={product.id} product={product} />
          ))}
        </div>
        {/* Global UI Elements like Status Bar or Top Nav could go here */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none flex items-center justify-center">
          <span className="text-white font-bold text-lg drop-shadow-md tracking-wider">LUMISHOP</span>
        </div>
      </main>
      <Toaster richColors position="top-center" />
    </div>
  );
}
export default HomePage;