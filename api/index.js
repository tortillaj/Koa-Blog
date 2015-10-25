import config from "../config";
import thinky from "./thinky";
import koa from "koa";
const app = koa();
const r   = thinky.r;

/**
 * Logging
 */
import logger from "koa-bunyan-logger";
//app.use(logger());
//app.use(logger.requestLogger());
if (config.api.env !== "test") {
  app.use(logger());
  app.use(logger.requestLogger()); 
  app.use(function *(next) {
    yield next;
    this.log.info(`Got a request from ${this.request.ip} for ${this.path}`);
  });
}

/**
 * CORS
 */
import cors from "koa-cors";
app.use(cors(config.koa.cors));

/**
 * Body Parse
 */
import koaBody from "koa-body";
app.use(koaBody());

/**
 * Routes
 */
import userRoutes from "./user/routes";
app.use(userRoutes.routes());

export default app;
