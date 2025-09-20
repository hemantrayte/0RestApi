import express, { NextFunction } from 'express'
import globalErrorHandler from './middlewares/globalErrorHandler';
import userRouter from './user/user.routes';

const app = express();
app.use(express.json())

//Routes
app.get("/", (req , res) => {
  res.json({message:"Welcom to my empire"})
})

app.use("/api/users",userRouter)


//global error handler
app.use(globalErrorHandler)


export default app