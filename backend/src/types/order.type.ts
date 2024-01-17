import { Document, Types } from "mongoose";

export interface CartItemTy {
  productId: Types.ObjectId;
  qty: number;
}

export interface OrderTy extends Document {
  _id?: string;
  userId: Types.ObjectId;
  items: CartItemTy[];
  totalAmount: number;
  status: OrderEnumTy;
  createdAt?: Date;
  updatedAt?: Date;
}

export type OrderEnumTy = "pending" | "shipped" | "delivered";
