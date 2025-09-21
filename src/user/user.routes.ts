import { Router } from "express";
import { createUser, loginUser } from "./user.controller";

const userRouter = Router()

//routes
userRouter.route("/register").post(createUser)
userRouter.route("login").post(loginUser)


export default userRouter