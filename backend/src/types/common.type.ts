import { Request } from "express";
import { UserTy } from "./user.type";

export interface IGetUserAuthInfoRequest extends Request {
  user: UserTy; // or any other type
}
