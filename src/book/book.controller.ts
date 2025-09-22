import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import cloudinary from "../config/cloudinary";
import path from "node:path";
import bookModel from "./book.model";
import fs from 'node:fs'
import { AuthRequest } from "../middlewares/verifyJWT";

const createBook = async(req:Request,res:Response, next:NextFunction) => {

  const {title, genre} = req.body;

  if(!title || !genre) {
    const error = createHttpError(400, "All Fields Are Required")
    next(error)
  }

  console.log("files", req.files)

  try {
  const files = req.files as { [fieldname:string]: Express.Multer.File[]};

  const coverImageMineType = files.coverImage[0].mimetype.split("/").at(-1);

  const fileName = files.coverImage[0].filename;
  const filePath = path.resolve(__dirname, '../../public/data/uploads', fileName)

  const uploadResult = await cloudinary.uploader.upload(filePath, {
  filename_override:fileName,
  folder:"book-covers",
  format:coverImageMineType,
  })

  const bookFileName = files.file[0].filename;
  const bookFilePath = path.resolve(
    __dirname, '../../public/data/uploads', 
    bookFileName
  )

  const bookFileUploadResult = await cloudinary.uploader.upload(bookFilePath, {
    resource_type:"raw",
    filename_override:bookFileName,
    folder:"book-pdfs",
    format:"pdf",
  })

  const _req = req as AuthRequest
  
  const newBook = await bookModel.create({
    title,
    genre,
    author:_req.userId,
    coverImage:uploadResult.secure_url,
    file:bookFileUploadResult.secure_url
  })

  //delete temp files
  await fs.promises.unlink(filePath)
  await fs.promises.unlink(bookFilePath)

  res.status(201).json(
    newBook
  )

  } catch (error) {
    console.log(error)
    return next(createHttpError(500, "Error while uploading the files"))
  }
}


const updateBook = async() => {

}

const listBook = async() => {

}

const getSingleBook = async() => {

}

const deleteBook = async() => {

}

export {
  createBook,
  updateBook,
  listBook,
  getSingleBook,
  deleteBook
}