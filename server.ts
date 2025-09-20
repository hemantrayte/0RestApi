import { confing } from './src/config/config'
import app from './src/app'
import connectDB from './src/config/db'


const port = confing.port || 4001

//type -1
const startServer = async() => {
 await connectDB()
  app.listen(port ,() => {
        console.log(`Listening on port:${port}`)
  })
}

startServer()


//type -2
// connectDB().then(() => {
//   app.listen(port, () =>{
//     console.log(`Listening on port:${port}`)
//   })
// }).catch((err) => {
// console.log(err)
// })