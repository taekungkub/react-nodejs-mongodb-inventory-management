import { NextFunction, Response } from "express";
import { IGetUserAuthInfoRequest } from "../types/common.type";

export async function onlyOwn(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
  const user = req.user;
  const { id } = req.params;

  if (user._id != id) {
    return res.status(200).json({
      statusCode: 400,
      description: "You are not own to access this",
    });
  }

  next();
}
