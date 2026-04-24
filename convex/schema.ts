import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";
const applicationTables = {
  products: defineTable({
    title: v.string(),
    description: v.string(),
    price: v.number(),
    videoUrl: v.string(),
    posterUrl: v.string(),
    variants: v.object({
      sizes: v.array(v.string()),
      colors: v.array(v.string()),
    }),
  }),
  likes: defineTable({
    userId: v.id("users"),
    productId: v.id("products"),
  })
    .index("by_user_and_product", ["userId", "productId"])
    .index("by_product", ["productId"]),
  saves: defineTable({
    userId: v.id("users"),
    productId: v.id("products"),
  })
    .index("by_user_and_product", ["userId", "productId"])
    .index("by_product", ["productId"]),
  orders: defineTable({
    userId: v.id("users"),
    productId: v.id("products"),
    size: v.string(),
    color: v.string(),
    total: v.number(),
    status: v.string(), // "completed"
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),
  files: defineTable({
    userId: v.id("users"),
    storageId: v.id("_storage"),
    filename: v.string(),
    mimeType: v.string(),
    size: v.number(),
    description: v.optional(v.string()),
    uploadedAt: v.number(),
  })
    .index("by_userId_uploadedAt", ["userId", "uploadedAt"])
    .index("by_userId_storageId", ["userId", "storageId"]),
};
export default defineSchema({
  ...authTables,
  ...applicationTables,
});