import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { VideoPost } from '@/components/VideoPost';
import { Toaster } from '@/components/ui/sonner';
import { motion } from 'framer-motion';
export function HomePage() {
  return (
    <div className="relative w-full h-[100dvh] bg-neutral-950 flex justify-center items-center overflow-hidden">
      {/* Ambient Background for Desktop */}
      <div className="hidden lg:block absolute inset-0 z-0 select-none pointer-events-none">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[100px] z-10" />
        <div className="flex w-full h-full opacity-40">
          {MOCK_PRODUCTS.map((p) => (
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
      <main className="relative z-10 w-full h-[100dvh] lg:max-w-[420px] lg:h-[880px] lg:rounded-[3rem] lg:border-[10px] lg:border-neutral-900 lg:shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden bg-black transition-all duration-500">
        <div className="h-full w-full overflow-y-auto snap-y snap-mandatory scrollbar-hide scroll-smooth">
          {MOCK_PRODUCTS.map((product) => (
            <VideoPost key={product.id} product={product} />
          ))}
        </div>
        {/* Global Branding Overlay */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/60 to-transparent pointer-events-none flex items-start justify-center pt-8 z-20">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
            <span className="text-white font-black text-xl tracking-[0.2em] drop-shadow-lg">LUMISHOP</span>
          </motion.div>
        </div>
      </main>
      {/* Mobile-only safe area spacers if needed can go here */}
      <Toaster richColors position="top-center" closeButton />
    </div>
  );
}
export default HomePage;