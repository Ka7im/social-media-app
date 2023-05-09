import express from "express";
const router = express.Router();
import userRouter from "./userRouter.js";
import postRouter from "./postRouter.js";
import commentRouter from "./commentRouter.js";
import messageRouter from "./messageRouter.js";

router.use("", userRouter);
router.use("", postRouter);
router.use("", commentRouter);
router.use("", messageRouter);

export default router;
