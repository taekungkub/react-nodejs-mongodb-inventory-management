import { Types } from "mongoose";

export interface ProductTy {
  _id?: string;
  title: string;
  description?: string;
  stock: number;
  price: number;
  status?: boolean;
  category: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
