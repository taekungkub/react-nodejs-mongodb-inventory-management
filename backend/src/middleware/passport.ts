import { PassportService } from "../config/passport-services";
import { NextFunction, Request, Response } from "express";
import { ERRORS } from "../helper/errors-message";

export function onlyAuth(req: Request, res: Response, next: NextFunction) {
  PassportService.passport.authenticate("jwt", { session: false }, function (err, user, info) {
    if (err) {
      return res.status(200).json({
        statusCode: 400,
        description: ERRORS.TYPE.SERVER_ERROR,
      });
    }

    if (!user) {
      return res.status(200).json({
        statusCode: 400,
        description: ERRORS.TOKEN_INVALID,
      });
    }

    req.user = user;
    next();
  })(req, res, next);
}
