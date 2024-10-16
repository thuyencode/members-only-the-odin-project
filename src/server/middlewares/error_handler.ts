/* eslint-disable @typescript-eslint/no-unused-vars */
import type e from 'express'
import { HttpError, InternalServerError } from '../errors'

function error_handler(
  err: unknown,
  _req: e.Request,
  res: e.Response,
  _next: e.NextFunction
) {
  try {
    if (err instanceof HttpError) {
      if (err instanceof InternalServerError) {
        console.error(err)
      }

      res.status(err.statusCode).json({
        error: {
          statusCode: err.statusCode,
          message: err.message,
          cause: err.cause
        }
      })
    } else {
      throw new InternalServerError(err)
    }
  } catch (err) {
    if (err instanceof InternalServerError) {
      console.log(err)

      res.status(err.statusCode).json({
        error: {
          statusCode: err.statusCode,
          message: err.message,
          cause: err.cause
        }
      })
    }
  }
}

export default error_handler
