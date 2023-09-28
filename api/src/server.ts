import { config } from 'dotenv'
import express from 'express'

const main = async () => {
  config()
  const app = express()
  const port = process.env.PORT || 3333
  app.use(express.json())

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

main()
