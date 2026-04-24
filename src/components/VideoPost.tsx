import React, { useRef, useEffect, useState } from 'react';
import { useIntersection } from 'react-use';
import { Product } from '@/lib/mockData';
import { ProductOverlay } from './ProductOverlay';
import { EngagementSidebar } from './EngagementSidebar';
import { Volume2, VolumeX } from 'lucide-react';
interface VideoPostProps {
  product: Product;
}
export function VideoPost({ product }: VideoPostProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const intersection = useIntersection(containerRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.6,
  });
  useEffect(() => {
    if (!videoRef.current) return;
    if (intersection && intersection.isIntersecting) {
      videoRef.current.play().catch(err => console.warn("Autoplay blocked:", err));
    } else {
      videoRef.current.pause();
    }
  }, [intersection]);
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };
  return (
    <div 
      ref={containerRef}
      className="relative h-[100dvh] w-full snap-center bg-black overflow-hidden flex flex-col justify-end"
    >
      <video
        ref={videoRef}
        src={product.videoUrl}
        poster={product.posterUrl}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        playsInline
        muted={isMuted}
      />
      {/* Dark gradient overlay for UI readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
      {/* Top Controls */}
      <div className="absolute top-6 right-4 z-20">
        <button 
          onClick={toggleMute}
          className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors"
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
      </div>
      {/* Main UI Components */}
      <div className="relative z-10 flex items-end justify-between p-2 pb-8 w-full max-w-full">
        <div className="flex-1 min-w-0">
          <ProductOverlay 
            title={product.title} 
            price={product.price} 
            description={product.description} 
          />
        </div>
        <EngagementSidebar 
          likes={product.likes} 
          comments={product.comments} 
          shares={product.shares} 
        />
      </div>
    </div>
  );
}