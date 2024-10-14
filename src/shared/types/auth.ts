import * as v from 'valibot'
import { SignInSchema, SignUpSchema } from '../schemas/auth.schema'

export type SignUpInput = v.InferInput<typeof SignUpSchema>

export type SignInInput = v.InferInput<typeof SignInSchema>
