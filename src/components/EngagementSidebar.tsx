import React from 'react';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
interface EngagementSidebarProps {
  likes: string;
  comments: string;
  shares: string;
  isLiked: boolean;
  isSaved: boolean;
  onLike: () => void;
  onSave: () => void;
}
export function EngagementSidebar({ 
  likes, 
  comments, 
  shares, 
  isLiked, 
  isSaved, 
  onLike, 
  onSave 
}: EngagementSidebarProps) {
  const iconVariants = {
    tap: { scale: 0.8 },
    hover: { scale: 1.1 }
  };
  return (
    <div className="flex flex-col items-center gap-6 text-white mb-8">
      <div className="flex flex-col items-center gap-1">
        <motion.button
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onLike}
          className={cn(
            "p-2 bg-white/10 backdrop-blur-md rounded-full transition-colors",
            isLiked ? "bg-rose-600/20" : "hover:bg-white/20"
          )}
        >
          <Heart 
            className={cn(
              "w-7 h-7 transition-colors duration-300", 
              isLiked ? "fill-rose-500 text-rose-500" : "fill-white"
            )} 
          />
        </motion.button>
        <span className="text-xs font-semibold drop-shadow-md">{likes}</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <motion.button
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
          className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
        >
          <MessageCircle className="w-7 h-7" />
        </motion.button>
        <span className="text-xs font-semibold drop-shadow-md">{comments}</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <motion.button
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onSave}
          className={cn(
            "p-2 bg-white/10 backdrop-blur-md rounded-full transition-colors",
            isSaved ? "bg-yellow-600/20" : "hover:bg-white/20"
          )}
        >
          <Bookmark 
            className={cn(
              "w-7 h-7 transition-colors duration-300", 
              isSaved ? "fill-yellow-500 text-yellow-500" : "fill-none"
            )} 
          />
        </motion.button>
        <span className="text-xs font-semibold drop-shadow-md">{isSaved ? "Saved" : "Save"}</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <motion.button
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
          className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
        >
          <Share2 className="w-7 h-7" />
        </motion.button>
        <span className="text-xs font-semibold drop-shadow-md">{shares}</span>
      </div>
    </div>
  );
}