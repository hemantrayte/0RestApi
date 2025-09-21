import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { confing } from "../config/config";


const createUser = async(req:Request, res:Response, next:NextFunction) => {

    try {
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
      const newUser = await userModel.create({
      name,
      email,
      password:hashedPassword 
      })
  
      //token generation
      const token = jwt.sign
      (
        {sub:newUser._id},
        confing.jwtSecret as string,
        {
          expiresIn:'7d'
        }
      )
      
      const userNew  = await userModel.findById(newUser._id).select("-password")
  
      res.json({userNew, token})

    } catch (error) {
      console.log(error)
      return next(createHttpError(500, "Error while creating user. "))
    }
}


const loginUser = async(req:Request,res:Response, next:NextFunction) => {
  try {
    const {email, password} = req.body
  
  if(!email || !password) {
    const error = createHttpError(400,"All fields are required")
    return next(error)
  }

  const user = await userModel.findOne({email:email}).select("-password")

  if(!user) {
    const error = createHttpError(400,"User Not Found || User Not Exist")
    return next(error)
  }
  
  const isPasswordCorrect = await bcrypt.compare(user.password, password)

  if(!isPasswordCorrect) {
    const error = createHttpError(400,"Invalid User Credetails")
    return next(error)
  }
  
  const token = jwt.sign(
    {sub:user._id}, 
    confing.jwtSecret as string, 
    {expiresIn:"7d"}
  )

  res.json({user, token})

  } catch (error) {
    console.log(error)
    return next(createHttpError(500, "Error while creating user. "))
  }
}


export { 
  createUser,
  loginUser
}