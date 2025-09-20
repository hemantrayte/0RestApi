import mongoose from "mongoose";
import { confing } from "./config";

const connectDB = async() => {
   try {

    mongoose.connection.on('connected', () => {
      console.log("Connected to database successfullly")
     })
 
     mongoose.connection.on('error', (err) => {
       console.log("Error in connecting to batabase", err)
      })
 

    await mongoose.connect(confing.databaseUrl as string);

   } catch (error) {
    console.log(error, "Error during the connect");
    process.exit(1)
   }
}

export default connectDB