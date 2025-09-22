import { Router } from "express";
import { createBook, getSingleBook, listBook, updateBook } from "./book.controller";
import multer from 'multer'
import path from "node:path";
import verifyJWT from "../middlewares/verifyJWT";

const bookRouter = Router()

const upload = multer({
  dest: path.resolve(__dirname, `../../public/data/uploads`),
  limits: { fileSize: 3e7 }
})

bookRouter.route("/create").post(
  verifyJWT,
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'file', maxCount: 1 }
  ]),
  createBook)

// bookRouter.route("/update/:id").patch(verifyJWT, updateBook)

// bookRouter.route("/").get(listBook)
// bookRouter.route("/:id").get(getSingleBook)

export default bookRouter

