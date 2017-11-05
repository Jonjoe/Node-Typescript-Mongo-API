import * as express from "express";
import * as _ from "lodash";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as helmet from "helmet";
import * as cors from "cors";
import * as Bluebird from "bluebird";
import * as JWT from "jsonwebtoken";
import * as passport from "passport";
import * as passportJWT from "passport-jwt";

import * as authResource from "./auth";
import * as usersResource from "./users";

require('dotenv').config()

import mongooseConfig from "../config/mongoose";

class Server {
  public app: express.Application;
  public port: any;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.config();
    this.dbConnection();
    this.middleware();
    this.secure();
    this.routes();
  }

  private config(): void {
    this.app.set("port", this.port);
  }

  private middleware(): void {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(helmet());
    this.app.use(logger("dev"));
    this.app.use(cors());
    this.app.use(passport.initialize());
  }

  private secure() {
    const ExtractJwt = passportJWT.ExtractJwt;
    const JwtStrategy = passportJWT.Strategy;
    let jwtOptions: any = {};

    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey = "tasmanianDevil";

    usersResource.model.find({}).then(users => {
      var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
        console.log("payload received", jwt_payload);
        const user: any = users[_.findIndex(users, { id: jwt_payload.id })];
        if (user) {
          next(null, user);
        } else {
          next(null, false);
        }
      });

      passport.use(strategy);
    });
  }

  private dbConnection(): void {
    (<any>mongoose).Promise = Bluebird;
    mongoose.connect(process.env.MONGO_URI, mongooseConfig);
  }

  private routes(): void {
    const router: express.Router = express.Router();

    this.app.use("/", router);
    this.app.use("/api/v1/auth", authResource.router);
    this.app.use("/api/v1/users", usersResource.router);
  }

  logRoutes() {
    return this.app._router.stack;
  }
}

export default Server;
