import * as express from "express";
import * as http from "http";
import UserRouter from "./UserRoute";

/**
 * @export
 * @param {express.Application} app
 */
export function init(app: express.Application): void {
  const router: express.Router = express.Router();

  app.use("/v1/users", UserRouter);

  app.use((req, res) => {
    res.status(404).send(http.STATUS_CODES[404]);
  });

  app.use(router);
}
