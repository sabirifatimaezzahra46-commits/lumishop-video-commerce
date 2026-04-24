import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useConvexAuth } from 'convex/react';
import { api } from '@convex/_generated/api';
import { VideoPost } from '@/components/VideoPost';
import { Toaster } from '@/components/ui/sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { SignInForm } from '@/components/SignInForm';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function HomePage() {
  const products = useQuery(api.products.list);
  const interactions = useQuery(api.interactions.getUserInteractions);
  const seed = useMutation(api.products.seed);
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  useEffect(() => { seed(); }, [seed]);
  if (authLoading || products === undefined) {
    return (
      <div className="h-[100dvh] w-full flex items-center justify-center bg-black">
        <Loader2 className="w-8 h-8 text-rose-600 animate-spin" />
      </div>
    );
  }
  return (
    <div className="relative w-full h-[100dvh] bg-neutral-950 flex justify-center items-center overflow-hidden">
      <div className="hidden lg:block absolute inset-0 z-0 select-none pointer-events-none">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[100px] z-10" />
        <div className="flex w-full h-full opacity-40">
          {products.slice(0, 3).map((p) => (
            <img key={`bg-${p._id}`} src={p.posterUrl} alt="" className="flex-1 object-cover" />
          ))}
        </div>
      </div>
      <main className="relative z-10 w-full h-[100dvh] lg:max-w-[420px] lg:h-[880px] lg:rounded-[3rem] lg:border-[10px] lg:border-neutral-900 lg:shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden bg-black transition-all duration-500">
        <div className="h-full w-full overflow-y-auto snap-y snap-mandatory scrollbar-hide scroll-smooth">
          {products.map((product) => (
            <VideoPost 
              key={product._id} 
              product={product} 
              isLiked={(interactions?.likedIds ?? []).includes(product._id)}
              isSaved={(interactions?.savedIds ?? []).includes(product._id)}
              onAuthRequired={() => setShowAuthModal(true)}
              globalAudio={audioEnabled}
              onToggleAudio={() => setAudioEnabled(!audioEnabled)}
            />
          ))}
        </div>
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/60 to-transparent pointer-events-none flex items-start justify-center pt-8 z-20">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
            <span className="text-white font-black text-xl tracking-[0.2em] drop-shadow-lg">LUMISHOP</span>
          </motion.div>
        </div>
      </main>
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="sm:max-w-md bg-white/10 backdrop-blur-xl border-white/20 text-white p-6 rounded-3xl overflow-hidden">
          <DialogTitle className="text-2xl font-bold text-center mb-4">انضم إلى لومي شوب</DialogTitle>
          <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            <SignInForm />
          </div>
        </DialogContent>
      </Dialog>
      <Toaster richColors position="top-center" closeButton />
    </div>
  );
}
export default HomePage;