"use strict";

const Router          = require("koa-router");
const UserController  = require("./controller");
const userRoutes      = new Router({
  prefix: "/api/user"
});

userRoutes.get("/", UserController.list);
userRoutes.get("/:id", UserController.get);
userRoutes.post("/", UserController.create);
userRoutes.put("/:id", UserController.update);
userRoutes.delete("/:id", UserController.delete);

module.exports = userRoutes;
