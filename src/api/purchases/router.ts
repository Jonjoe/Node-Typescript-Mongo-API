/**
 * Express Router
 * [model name]
 */

// Imports =============================
import { Router, Request, Response, NextFunction } from "express";
import Model from "./model";

// Router ==============================
// Router Class ========================
class ResourceRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  // Return a list of [model name]s
  public get(req: Request, res: Response): void {
    Model.find({})
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

  // Create a new [model name] record.
  public create(req: Request, res: Response): void {}

  // Update an existing [model name] record.
  public update(req: Request, res: Response): void {}

  // Remove a [model name] record.
  public delete(req: Request, res: Response): void {}

  // Compile all methods into expres routes.
  public routes() {
    this.router.get("/", this.get);
  }
}

// Exports =============================
export default new ResourceRouter().router;
