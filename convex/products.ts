import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
export const list = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();
    return await Promise.all(
      products.map(async (product) => {
        const likes = await ctx.db
          .query("likes")
          .withIndex("by_product", (q) => q.eq("productId", product._id))
          .collect();
        const saves = await ctx.db
          .query("saves")
          .withIndex("by_product", (q) => q.eq("productId", product._id))
          .collect();
        return {
          ...product,
          likesCount: likes.length.toString(),
          savesCount: saves.length.toString(),
          sharesCount: "1.2K", // Static for now as per UI logic
          commentsCount: "856",
        };
      })
    );
  },
});
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("products").first();
    if (existing) return;
    const mockData = [
      {
        title: "Premium Wireless Headphones",
        description: "Experience studio-quality sound with our latest noise-cancelling technology.",
        price: 299.99,
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-girl-dancing-and-listening-to-music-with-headphones-42445-large.mp4",
        posterUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
        variants: {
          sizes: ["Standard", "XL Cushions"],
          colors: ["Midnight Black", "Arctic White", "Royal Blue"]
        }
      },
      {
        title: "Minimalist Smart Watch",
        description: "The perfect blend of style and functionality. Track your health and more.",
        price: 199.50,
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-downward-view-3456-large.mp4",
        posterUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
        variants: {
          sizes: ["40mm", "44mm"],
          colors: ["Space Gray", "Silver", "Rose Gold"]
        }
      },
      {
        title: "Organic Skincare Set",
        description: "Glow naturally with our 100% organic facial routine. Tested for all skin types.",
        price: 85.00,
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-80-large.mp4",
        posterUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop",
        variants: {
          sizes: ["Travel Kit", "Full Routine"],
          colors: ["Natural Glow"]
        }
      }
    ];
    for (const p of mockData) {
      await ctx.db.insert("products", p);
    }
  },
});