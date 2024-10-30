import type { User } from '@/shared/types'
import jwt from 'jsonwebtoken'
import env from './env'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateTokens = ({ salted_hash, ...user }: User) => {
  const refreshToken = jwt.sign(user, env.REFRESH_TOKEN_SECRET, {
    expiresIn: '90d'
  })
  const accessToken = jwt.sign(user, env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m'
  })

  return { refreshToken, accessToken }
}
