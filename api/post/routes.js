import Router from "koa-router";
import PostController from "./controller";
 
const postRoutes = new Router({
  prefix: "/api/post"
});

postRoutes.get("/", PostController.list);
postRoutes.get("/:id", PostController.get);
postRoutes.post("/", PostController.create);
postRoutes.put("/:id", PostController.update);
postRoutes.delete("/:id", PostController.delete);                                                                               

export default postRoutes;
