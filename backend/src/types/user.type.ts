import { JwtPayload } from "jsonwebtoken";

export interface UserTy {
  _id?: string;
  username: string;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserJwtTy extends JwtPayload, UserTy {}
