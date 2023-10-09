import { NextFunction, Request, Response } from 'express'

export const cors = (req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = ['http://0.0.0.0:5173', req.headers.origin]

  if (allowedOrigins.includes(req.headers.origin)) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin as string)
  }
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Max-Age', '10')
  next()
}
