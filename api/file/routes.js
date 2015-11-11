"use strict";

const Router = require("koa-router");
const FileController = require("./controller");
const fileRoutes = new Router({
  prefix: "/api/file"
});

fileRoutes.get("/", FileController.list);
fileRoutes.get("/:id", FileController.get);
fileRoutes.post("/", FileController.create);
fileRoutes.delete("/:id", FileController.delete);

module.exports = fileRoutes;
