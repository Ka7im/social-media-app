import express from "express";
import { checkAuth, handleValidationErrors } from "../middleware/index.js";
import { UserController } from "../controllers/index.js";
import { loginValidation, registerValidator } from "../validations/auth.js";
const userRouter = express.Router();

userRouter.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
userRouter.post(
  "/auth/register",
  registerValidator,
  handleValidationErrors,
  UserController.register
);
userRouter.get("/auth/user", checkAuth, UserController.getUserById);
userRouter.patch("/auth/user", checkAuth, UserController.updateUserInfo);
userRouter.get("/auth/friend", checkAuth, UserController.getFriends);
userRouter.patch("/auth/friend", checkAuth, UserController.addFriend);
userRouter.delete("/auth/friend", checkAuth, UserController.removeFriend);
userRouter.post("/theme", checkAuth, UserController.toggleTheme);
userRouter.get("/search", UserController.getUserByName);

export default userRouter;
