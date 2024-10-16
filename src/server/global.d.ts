import { User } from '@/shared/types'

declare module 'jsonwebtoken' {
  export interface JwtPayload extends Omit<User, 'salted_hash'> {}
}

declare module 'express' {
  export interface Request {
    signedCookies: { token?: string }
  }
}

export {}
