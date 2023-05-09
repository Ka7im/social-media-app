import express from "express";
import { checkAuth, handleValidationErrors } from "../middleware/index.js";
import { PostController } from "../controllers/index.js";
import { postCreateValidation } from "../validations/post.js";
const postRouter = express.Router();

postRouter.get("/tags", checkAuth, PostController.getLastTags);
postRouter.get("/posts", checkAuth, PostController.getAll);
postRouter.get("/posts/user", checkAuth, PostController.getUserPosts);
postRouter.get("/posts/:id", checkAuth, PostController.getOne);
postRouter.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
postRouter.delete("/posts/:id", checkAuth, PostController.remove);
postRouter.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);
postRouter.patch("/post/like", checkAuth, PostController.like);
postRouter.patch("/post/unlike", checkAuth, PostController.unlike);

export default postRouter;
