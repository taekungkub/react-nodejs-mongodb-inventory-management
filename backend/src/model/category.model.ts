import mongoose from "mongoose";
import { CartItemTy, OrderTy } from "../types/order.type";
import { CategoryTy } from "../types/category.type";

const categorySchema = new mongoose.Schema<CategoryTy>(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
  },
  { collection: "category", timestamps: true }
);

export const CategoryModel = mongoose.model("Category", categorySchema);
