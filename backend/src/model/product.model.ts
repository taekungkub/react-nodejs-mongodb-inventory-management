import mongoose, { Schema } from "mongoose";
import { ProductTy } from "../types/product.type";

const ProductSchema = new mongoose.Schema<ProductTy>(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: Boolean },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },

  { collection: "product", timestamps: true }
);

export const ProductModel = mongoose.model("Product", ProductSchema);
