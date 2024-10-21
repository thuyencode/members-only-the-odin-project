import BadRequest from '@/server/errors/BadRequest'
import Unauthorized from '@/server/errors/Unauthorized'
import { generateTokens } from '@/server/libs/utils/auth'
import env from '@/server/libs/utils/env'
import type e from 'express'
import jwt from 'jsonwebtoken'

const getNewAccessToken = (req: e.Request, res: e.Response) => {
  try {
    const refreshToken = req.signedCookies.refresh_token

    if (!refreshToken) {
      throw new Unauthorized()
    }

    const decoded = jwt.verify(refreshToken, env.JWT_SECRET)

    if (typeof decoded === 'string') {
      throw new BadRequest("jwt doesn't contains needed info")
    }

    const { accessToken } = generateTokens({
      id: decoded.id,
      name: decoded.name,
      username: decoded.username
    })

    res.json({ accessToken }).send()
  } catch (error) {
    if (
      error instanceof jwt.TokenExpiredError ||
      error instanceof jwt.NotBeforeError
    ) {
      throw new Unauthorized(error)
    }

    if (error instanceof jwt.JsonWebTokenError) {
      throw new BadRequest(error)
    }

    throw error
  }
}

const GetAccessTokenController = {
  getNewAccessToken
}

export default GetAccessTokenController
