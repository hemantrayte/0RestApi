import app from './src/app'


const port = process.env.PORT || 4001

const startServer = () => {

  app.listen(port ,() => {
     console.log(`Listening on port:${port}`)
  })
}

startServer()