import { JwtPayload } from "jsonwebtoken";

export type RoleTy = "user" | "admin" | "root";

export interface UserTy {
  _id?: string;
  username: string;
  email: string;
  password?: string;
  role: RoleTy;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserJwtTy extends JwtPayload, UserTy {}
