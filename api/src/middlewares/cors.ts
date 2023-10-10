import { NextFunction, Request, Response } from 'express'

export const cors = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin as string
  const allowedOrigins = ['http://0.0.0.0:5173', origin]

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Max-Age', '10')
  next()
}
