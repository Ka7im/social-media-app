import express from "express";
import { checkAuth } from "../middleware/index.js";
import { CommentController } from "../controllers/index.js";
const commentRouter = express.Router();

commentRouter.get("/comments", checkAuth, CommentController.getCommentByPostId);
commentRouter.get(
  "/comments/:id",
  checkAuth,
  CommentController.getUserComments
);
commentRouter.post("/comments", checkAuth, CommentController.create);

export default commentRouter;
