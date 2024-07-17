import express from "express";
import protectRoute from "../authorization/auth.protectRoutes.js";
import getUsers from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.get("/user", protectRoute, getUsers);

export default userRouter;