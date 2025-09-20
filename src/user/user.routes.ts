import { Router } from "express";
import { createUser } from "./user.controller";

const userRouter = Router()

//routes
userRouter.route("/register").post(createUser)


export default userRouter