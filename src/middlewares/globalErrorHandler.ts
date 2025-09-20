import { HttpError } from "http-errors";
import { confing } from "../config/config";
import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (err:HttpError, req:Request, res:Response,next:NextFunction) => {
  const statusCode = err.statusCode || 500;

 return res.status(statusCode)
 .json({
    message:err.message,
    errorStack: confing.env === "development" ? err.stack : ""
 });

}

export default globalErrorHandler
