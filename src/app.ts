import express from 'express'

const app = express();

//Routes
app.get("/", (req , res) => {
  res.json({message:"Welcom to my empire"})
})


export default app