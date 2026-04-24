import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
export const toggleLike = mutation({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Authentication required");
    const existing = await ctx.db
      .query("likes")
      .withIndex("by_user_and_product", (q) => q.eq("userId", userId).eq("productId", args.productId))
      .unique();
    if (existing) {
      await ctx.db.delete(existing._id);
      return false;
    } else {
      await ctx.db.insert("likes", { userId, productId: args.productId });
      return true;
    }
  },
});
export const toggleSave = mutation({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Authentication required");
    const existing = await ctx.db
      .query("saves")
      .withIndex("by_user_and_product", (q) => q.eq("userId", userId).eq("productId", args.productId))
      .unique();
    if (existing) {
      await ctx.db.delete(existing._id);
      return false;
    } else {
      await ctx.db.insert("saves", { userId, productId: args.productId });
      return true;
    }
  },
});
export const getUserInteractions = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return { likedIds: [], savedIds: [] };
    const likes = await ctx.db
      .query("likes")
      .withIndex("by_user_and_product", (q) => q.eq("userId", userId))
      .collect();
    const saves = await ctx.db
      .query("saves")
      .withIndex("by_user_and_product", (q) => q.eq("userId", userId))
      .collect();
    return {
      likedIds: likes.map((l) => l.productId),
      savedIds: saves.map((s) => s.productId),
    };
  },
});