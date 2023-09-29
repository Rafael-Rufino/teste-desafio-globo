import { config } from 'dotenv'

import express from 'express'

import { cors } from './middlewares/cors'

import router from './routes/userRoutes'

const main = async () => {
  config()

  const app = express()

  const port = process.env.PORT || 3333

  app.use(express.json())
  app.use(cors)
  app.use(router)

  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

main()
