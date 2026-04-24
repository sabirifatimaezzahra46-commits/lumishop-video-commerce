import React, { useRef, useEffect, useState } from 'react';
import { useIntersection } from 'react-use';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from 'convex/react';
import { api } from '@convex/_generated/api';
import { ProductOverlay } from './ProductOverlay';
import { EngagementSidebar } from './EngagementSidebar';
import { CheckoutDrawer } from './CheckoutDrawer';
import { Volume2, VolumeX, Heart, Play } from 'lucide-react';
interface VideoPostProps {
  product: any;
  isLiked: boolean;
  isSaved: boolean;
  onAuthRequired: () => void;
  globalAudio: boolean;
  onToggleAudio: () => void;
}
export function VideoPost({ product, isLiked, isSaved, onAuthRequired, globalAudio, onToggleAudio }: VideoPostProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showHeartPop, setShowHeartPop] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const lastTap = useRef<number>(0);
  const toggleLikeMutation = useMutation(api.interactions.toggleLike);
  const toggleSaveMutation = useMutation(api.interactions.toggleSave);
  const intersection = useIntersection(containerRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.6,
  });
  useEffect(() => {
    if (!videoRef.current) return;
    if (intersection && intersection.isIntersecting && !showCheckout) {
      videoRef.current.play().catch((err) => {
        console.warn("[LUMISHOP] Autoplay blocked:", err);
        setNeedsInteraction(true);
      });
    } else {
      videoRef.current.pause();
    }
  }, [intersection, showCheckout]);
  const handleManualPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setNeedsInteraction(false);
    }
  };
  const handleDoubleTap = (e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      handleLike();
      setShowHeartPop(true);
      setTimeout(() => setShowHeartPop(false), 800);
    }
    lastTap.current = now;
  };
  const handleLike = async () => {
    try {
      await toggleLikeMutation({ productId: product._id });
    } catch (e) {
      onAuthRequired();
    }
  };
  const handleSave = async () => {
    try {
      await toggleSaveMutation({ productId: product._id });
    } catch (e) {
      onAuthRequired();
    }
  };
  return (
    <div ref={containerRef} onClick={handleDoubleTap} className="relative h-[100dvh] w-full snap-center bg-black overflow-hidden flex flex-col justify-end select-none">
      <video
        ref={videoRef}
        src={product.videoUrl}
        poster={product.posterUrl}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        playsInline
        muted={!globalAudio}
      />
      <AnimatePresence>
        {needsInteraction && intersection?.isIntersecting && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleManualPlay}
            className="absolute inset-0 flex items-center justify-center z-40 bg-black/20"
          >
            <div className="p-6 bg-rose-600 rounded-full shadow-2xl">
              <Play className="w-12 h-12 text-white fill-white" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-6 right-4 z-20">
        <button onClick={(e) => { e.stopPropagation(); onToggleAudio(); }} className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors">
          {globalAudio ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
        </button>
      </div>
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
          likes={product.likesCount}
          comments={product.commentsCount}
          shares={product.sharesCount}
          isLiked={isLiked}
          isSaved={isSaved}
          onLike={handleLike}
          onSave={handleSave}
        />
      </div>
      <CheckoutDrawer product={product} isOpen={showCheckout} onClose={() => setShowCheckout(false)} />
    </div>
  );
}