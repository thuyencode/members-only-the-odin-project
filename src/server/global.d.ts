import { User } from '@/shared/types'

declare module 'jsonwebtoken' {
  export interface JwtPayload extends Omit<User, 'salted_hash'> {}
}

declare module 'express' {
  export interface Request {
    signedCookies: { refresh_token?: string }
  }
}

declare module 'express-serve-static-core' {
  export interface Request {
    user?: Omit<User, 'salted_hash'>
  }
}

export {}
