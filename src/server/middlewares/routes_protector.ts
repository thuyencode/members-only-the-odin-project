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
    const accessToken = req.headers.authorization?.split(' ')[1]

    if (!accessToken) {
      throw new Unauthorized()
    }

    const decoded = jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET)

    if (typeof decoded === 'string') {
      throw new BadRequest("jwt doesn't contains needed info")
    }

    req.user = {
      id: decoded.id,
      name: decoded.name,
      username: decoded.username
    }

    next()
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

export default routes_protector
