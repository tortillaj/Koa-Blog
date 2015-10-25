import Router from "koa-router";
import UserController from "./controller";

const userRoutes = new Router({
  prefix: "/api/user"
});

userRoutes.get("/", UserController.list);
userRoutes.get("/:id", UserController.get);
userRoutes.post("/", UserController.create);
userRoutes.put("/:id", UserController.update);
userRoutes.delete("/:id", UserController.delete);

export default userRoutes;
