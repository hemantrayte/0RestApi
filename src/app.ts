import express, { NextFunction } from 'express'
import globalErrorHandler from './middlewares/globalErrorHandler';
import userRouter from './user/user.routes';
import bookRouter from './book/book.routes';

const app = express();
app.use(express.json())


//routes
app.use("/api/users",userRouter)
app.use("/api/books", bookRouter)


//global error handler
app.use(globalErrorHandler)


export default app