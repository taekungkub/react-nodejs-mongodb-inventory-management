import mongoose from "mongoose";
import { CartItemTy, OrderTy } from "../types/order.type";

const cartItemSchema = new mongoose.Schema<CartItemTy>({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  qty: { type: Number, default: 1 },
});

const orderSchema = new mongoose.Schema<OrderTy>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [{ cartItemSchema }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "shipped", "delivered"], default: "pending" },
  },
  { collection: "order", timestamps: true }
);

export const OrderModel = mongoose.model("Order", orderSchema);
