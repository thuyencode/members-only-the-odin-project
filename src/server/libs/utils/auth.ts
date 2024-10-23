import type { User } from '@/shared/types'
import jwt from 'jsonwebtoken'
import env from './env'

export const generateTokens = (user: Omit<User, 'salted_hash'>) => {
  const refreshToken = jwt.sign(user, env.REFRESH_TOKEN_SECRET, {
    expiresIn: '90 days'
  })
  const accessToken = jwt.sign(user, env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h'
  })

  return { refreshToken, accessToken }
}
