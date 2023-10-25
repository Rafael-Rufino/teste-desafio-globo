import { Router } from 'express'

import { prisma } from '../lib/prisma'

import { HttpStatusCode } from '../protocols/protocols'

const router = Router()

router.get('/highlights', async (req, res) => {
  try {
    const highlights = await prisma.highlights.findMany({
      include: {
        queries: {
          select: {
            value: true,
          },
        },
      },
    })

    res.status(HttpStatusCode.Ok).json({ highlights })
  } catch (error) {
    res
      .status(HttpStatusCode.SERVER_ERROR)
      .json({ error: 'Internal server error' })
  }
})

router.get('/suggestions', async (req, res) => {
  try {
    const suggestions = await prisma.suggestions.findMany({
      select: {
        value: true,
      },
    })
    res.status(HttpStatusCode.Ok).json({ suggestions })
  } catch (error) {
    res
      .status(HttpStatusCode.SERVER_ERROR)
      .json({ error: 'Internal server error' })
  }
})

export default router
