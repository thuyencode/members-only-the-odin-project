import type * as v from 'valibot'
import type { SignInSchema, SignUpSchema } from '../schemas/auth.schema'

export type SignUpInput = v.InferInput<typeof SignUpSchema>

export type SignInInput = v.InferInput<typeof SignInSchema>

export interface AccessTokenResponse {
  accessToken: string
}
