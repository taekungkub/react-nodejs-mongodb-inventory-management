import mongoose from "mongoose";
import { UserTy } from "../types/user.type";

const UserSchema = new mongoose.Schema<UserTy>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true, select: false },
    email: { type: String, required: false },
    role: { type: String, enum: ["user", "admin", "root"], default: "user" },
  },
  { collection: "user", timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);
