import { z } from "zod"

export const ProductSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string(),
  stock: z.string().min(1, {
    message: "Stock is required",
  }),
  price: z.string().min(1, {
    message: "Price is required",
  }),
})
