import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./user.model";
import bcrypt from 'bcrypt'


const createUser = async(req:Request, res:Response, next:NextFunction) => {

    const {name, email, password} = req.body

    if(!name || !email || !password) {
      const error = createHttpError(400,"All fields are required")
      return next(error)
    }

    const user = await userModel.findOne({email:email})

    if(user) {
      const error = createHttpError(400,"User already exist with this email")
      return next(error)
    }
    
    //password
    const hashedPassword = await bcrypt.hash(password, 10)

    //create user and save in data base 
    await userModel.create({
      
    })
    
}


export { createUser}