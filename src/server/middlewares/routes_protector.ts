import type e from 'express'
import jwt from 'jsonwebtoken'
import BadRequest from '../errors/BadRequest'
import Unauthorized from '../errors/Unauthorized'
import env from '../libs/utils/env'

const routes_protector = (
  req: e.Request,
  res: e.Response,
  next: e.NextFunction
) => {
  try {
    const refreshToken = req.signedCookies.refresh_token

    if (!refreshToken) {
      throw new Unauthorized()
    }

    const decoded = jwt.verify(refreshToken, env.JWT_SECRET)

    if (typeof decoded === 'string') {
      throw new BadRequest("jwt doesn't contains needed info")
    }

    next()
  } catch (error) {
    if (
      error instanceof jwt.TokenExpiredError ||
      error instanceof jwt.NotBeforeError
    ) {
      throw new Unauthorized(error.message)
    }

    if (error instanceof jwt.JsonWebTokenError) {
      throw new BadRequest(error.message)
    }

    throw error
  }
}

export default routes_protector
