"use strict";

const config    = require("../config");
const koa       = require("koa");
const app       = koa();

/**
 * Logging
 */
const logger = require("koa-bunyan-logger");
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
const cors = require("koa-cors");
app.use(cors(config.koa.cors));

/**
 * Body Parse
 */
const koaBody = require("koa-body");
app.use(koaBody());

/**
 * Routes
 */
const userRoutes = require("./user/routes");
app.use(userRoutes.routes());
const postRoutes = require("./post/routes");
app.use(postRoutes.routes());

module.exports = app;
