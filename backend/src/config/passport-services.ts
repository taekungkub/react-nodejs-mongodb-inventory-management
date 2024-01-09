import passport from "passport";
import passportJWT from "passport-jwt";
import { secretJWT } from "./global-config";
import { UserTy } from "@/types/user.type";
import { UserModel } from "../persistence/mongodb/user.model";

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

export class PassportService {
  static passport: typeof passport;
}

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretJWT,
};

PassportService.passport = passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload: UserTy, cb) => {
    try {
      const user = await UserModel.findOne({
        email: jwtPayload.email,
      });
      if (jwtPayload.email != user.email) return cb(null, false);
      return cb(null, user);
    } catch (error) {
      return cb(null, false);
    }
  })
);
