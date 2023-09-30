import { config } from 'dotenv'

import express from 'express'

import { cors } from './middlewares/cors'
import routes from './routes'

const main = async () => {
  config()

  const app = express()

  app.use(cors)

  app.use(express.json())

  app.use(routes)

  const port = process.env.PORT || 3333

  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

main()
