import { z } from "zod"

const CartItemSchema = z.object({
  productId: z.string().min(1, {
    message: "productId is required",
  }),
  qty: z.number({ required_error: "qty is required" }),
})

export const CreateOrderSchema = z.object({
  items: z.array(CartItemSchema),
  totalAmount: z.string().min(1, {
    message: "totalAmount is required",
  }),
})
