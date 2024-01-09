import { PassportService } from "../config/passport-services";
import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../helper/utils";
import { ERRORS } from "../helper/errors-message";

export function onlyAuth(req: Request, res: Response, next: NextFunction) {
  PassportService.passport.authenticate("jwt", { session: false }, function (err, user, info) {
    if (err) {
      return res.json(errorResponse(403, ERRORS.TYPE.SERVER_ERROR, ERRORS.TYPE.SERVER_ERROR));
    }

    if (!user) {
      return res.json(errorResponse(403, ERRORS.TYPE.SERVER_ERROR, ERRORS.TOKEN_INVALID));
    }

    req.user = user;
    next();
  })(req, res, next);
}
