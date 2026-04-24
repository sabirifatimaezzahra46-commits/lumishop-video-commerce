import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface ProductOverlayProps {
  title: string;
  price: number;
  description: string;
  onShopNow: () => void;
}
export function ProductOverlay({ title, price, description, onShopNow }: ProductOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col gap-3 p-4 text-white w-full"
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-bold drop-shadow-lg leading-tight">{title}</h2>
        <p className="text-sm text-white/90 line-clamp-2 drop-shadow-md max-w-[85%]">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-3 mt-1">
        <span className="text-2xl font-bold text-white drop-shadow-lg">
          ${price.toFixed(2)}
        </span>
      </div>
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Button
          onClick={onShopNow}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold h-14 rounded-xl text-lg shadow-xl shadow-rose-900/40 active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          تسوق الآن
        </Button>
      </motion.div>
    </motion.div>
  );
}