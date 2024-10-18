import { User } from '@/shared/types'
import jwt from 'jsonwebtoken'
import env from './env'

export const generateTokens = ({ salted_hash, ...user }: User) => {
  const refreshToken = jwt.sign(user, env.JWT_SECRET, { expiresIn: '90 days' })

  const accessToken = jwt.sign(user, env.JWT_SECRET, { expiresIn: '1h' })

  return { refreshToken, accessToken }
}
