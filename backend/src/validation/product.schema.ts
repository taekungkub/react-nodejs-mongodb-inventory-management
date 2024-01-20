import { z } from "zod";

export const ProductSchema = z.object({
  body: z.object({
    title: z.string().min(1, {
      message: "Title is required",
    }),
    description: z.string(),
    stock: z.coerce.string().min(1, {
      message: "Stock is required",
    }),
    price: z.coerce.string().min(1, {
      message: "Price is required",
    }),
    status: z.optional(z.boolean()),
    category: z.coerce.string().min(1, {
      message: "Category is required",
    }),
  }),
});

export const CategorySchema = z.object({
  body: z.object({
    title: z.string().min(1, {
      message: "Title is required",
    }),
    description: z.string().optional(),
  }),
});
