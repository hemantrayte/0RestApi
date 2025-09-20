import { confing } from './src/config/config'
import app from './src/app'


const port = confing.port || 4001

const startServer = () => {

  app.listen(port ,() => {
     console.log(`Listening on port:${port}`)
  })
}

startServer()