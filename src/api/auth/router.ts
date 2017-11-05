import { Router, Request, Response, NextFunction } from "express";
import * as passport from "passport";
import * as JWT from "jsonwebtoken";
import * as passportJWT from "passport-jwt";
import * as _ from "lodash";

import User from "../users/model";

class AuthRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public post(req: Request, res: Response): void {
    console.log("REQ", req.body);

    const ExtractJwt = passportJWT.ExtractJwt;
    const JwtStrategy = passportJWT.Strategy;

    let jwtOptions: any = {};
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey = "tasmanianDevil";

    User.findOne({ emailAddress: req.body.emailAddress })
      .then((user: any) => {
        // TODO: This needs hashing
        if (user.password === req.body.password) {
          var payload = { id: user.id };
          var token = JWT.sign(payload, jwtOptions.secretOrKey);
          res.json({ message: "ok", token: token });
        } else {
          res.status(401).json({ message: "password did not match" });
        }
      })
      .catch(() => {
        res.status(401).json({ message: "User not found" });
      });
  }

  public routes() {
    this.router.post("/", this.post);
  }
}

export default new AuthRouter().router;
