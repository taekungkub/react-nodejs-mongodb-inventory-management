import { Document, Types } from "mongoose";

export interface CategoryTy extends Document {
  _id?: string;
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
