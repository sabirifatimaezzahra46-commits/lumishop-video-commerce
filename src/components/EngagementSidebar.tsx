import React from 'react';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
interface EngagementSidebarProps {
  likes: string;
  comments: string;
  shares: string;
}
export function EngagementSidebar({ likes, comments, shares }: EngagementSidebarProps) {
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
          className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
        >
          <Heart className="w-7 h-7 fill-white" />
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
          className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
        >
          <Bookmark className="w-7 h-7" />
        </motion.button>
        <span className="text-xs font-semibold drop-shadow-md">Save</span>
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