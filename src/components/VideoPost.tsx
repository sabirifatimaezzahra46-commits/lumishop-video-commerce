import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useIntersection } from 'react-use';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/lib/mockData';
import { ProductOverlay } from './ProductOverlay';
import { EngagementSidebar } from './EngagementSidebar';
import { CheckoutDrawer } from './CheckoutDrawer';
import { Volume2, VolumeX, Heart } from 'lucide-react';
interface VideoPostProps {
  product: Product;
}
export function VideoPost({ product }: VideoPostProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showHeartPop, setShowHeartPop] = useState(false);
  const lastTap = useRef<number>(0);
  const intersection = useIntersection(containerRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.6,
  });
  useEffect(() => {
    if (!videoRef.current) return;
    if (intersection && intersection.isIntersecting && !showCheckout) {
      videoRef.current.play().catch(err => console.warn("Autoplay blocked:", err));
    } else {
      videoRef.current.pause();
    }
  }, [intersection, showCheckout]);
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };
  const handleDoubleTap = (e: React.MouseEvent) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      setIsLiked(true);
      setShowHeartPop(true);
      setTimeout(() => setShowHeartPop(false), 800);
    }
    lastTap.current = now;
  };
  return (
    <div
      ref={containerRef}
      onClick={handleDoubleTap}
      className="relative h-[100dvh] w-full snap-center bg-black overflow-hidden flex flex-col justify-end select-none"
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
      {/* Heart Pop Animation */}
      <AnimatePresence>
        {showHeartPop && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
          >
            <Heart className="w-24 h-24 fill-rose-500 text-rose-500 drop-shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Dark gradient overlay for UI readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
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
            onShopNow={() => setShowCheckout(true)}
          />
        </div>
        <EngagementSidebar
          likes={product.likes}
          comments={product.comments}
          shares={product.shares}
          isLiked={isLiked}
          isSaved={isSaved}
          onLike={() => setIsLiked(!isLiked)}
          onSave={() => setIsSaved(!isSaved)}
        />
      </div>
      <CheckoutDrawer 
        product={product} 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
      />
    </div>
  );
}