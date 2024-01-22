import mongoose, { Schema } from "mongoose";
import { CartItemTy, OrderTy } from "../types/order.type";

const orderSchema = new mongoose.Schema<OrderTy>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        qty: { type: Number, default: 1 },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "shipped", "delivered"], default: "pending" },
  },
  { collection: "order", timestamps: true }
);

export const OrderModel = mongoose.model("Order", orderSchema);
