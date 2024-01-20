import { NextFunction, Response } from "express";
import { RoleTy } from "../types/user.type";
import { IGetUserAuthInfoRequest } from "../types/common.type";

export default function onlyRole(roles: Array<RoleTy>) {
  return async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!roles.includes(user.role)) {
      if (!user) {
        return res.status(200).json({
          statusCode: 400,
          description: "You are not authorized to access this",
        });
      }

      next();
    }
  };
}
