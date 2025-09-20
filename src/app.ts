import express, { NextFunction } from 'express'
import globalErrorHandler from './middlewares/globalErrorHandler';

const app = express();

//Routes
app.get("/", (req , res) => {
  res.json({message:"Welcom to my empire"})
})



//global error handler
app.use(globalErrorHandler)


export default app