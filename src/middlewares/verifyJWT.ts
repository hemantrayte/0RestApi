import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from 'jsonwebtoken'
import userModel from "../user/user.model";

export interface AuthRequest extends Request {
  userId:string
}

const verifyJWT = async(req:Request,res:Response, next:NextFunction) => {

  const token =
  req.cookies?.accessToken ||
  req.header("Authorization")?.replace("Bearer ", "");

  if(!token) {
    const error= createHttpError(401,"Token Not Exist")
    next(error)
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

  const _req = req as AuthRequest

  _req.userId = decodedToken.sub as string

  next();

}

export default verifyJWT