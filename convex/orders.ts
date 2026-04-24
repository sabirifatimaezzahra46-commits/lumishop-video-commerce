import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
export const placeOrder = mutation({
  args: {
    productId: v.id("products"),
    size: v.string(),
    color: v.string(),
    total: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Authentication required");
    const orderId = await ctx.db.insert("orders", {
      userId,
      productId: args.productId,
      size: args.size,
      color: args.color,
      total: args.total,
      status: "completed",
      createdAt: Date.now(),
    });
    return orderId;
  },
});