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
app.use(require("./user/routes").routes());
app.use(require("./post/routes").routes());
app.use(require("./file/routes").routes());

module.exports = app;
