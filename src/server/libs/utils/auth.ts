import { User } from '@/shared/types'
import jwt from 'jsonwebtoken'
import env from './env'

export const generateTokens = (user: Omit<User, 'salted_hash'>) => {
  const opts = [user, env.JWT_SECRET] as const

  const refreshToken = jwt.sign(...opts, { expiresIn: '90 days' })
  const accessToken = jwt.sign(...opts, { expiresIn: '1h' })

  return { refreshToken, accessToken }
}
