import { Router, Request, Response, NextFunction } from "express";
import * as passport from "passport";

import User from "./model";

class UserRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public get(req: Request, res: Response): void {
    User.find({})
      .then(data => {
        res.status(200).json({
          status: res.statusCode,
          data
        });
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  public create(req: Request, res: Response): void {}
  public update(req: Request, res: Response): void {}
  public delete(req: Request, res: Response): void {}

  public routes() {
    this.router.get(
      "/",
      passport.authenticate("jwt", { session: false }),
      this.get
    );
  }
}

export default new UserRouter().router;
