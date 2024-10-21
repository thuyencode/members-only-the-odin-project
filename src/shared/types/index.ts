import * as v from 'valibot'
import { NewMessageInputSchema } from '../schemas/message.schema'
import { SignUpInput } from './auth.type'

export interface User extends Omit<SignUpInput, 'password'> {
  id: number
  salted_hash: string
}

export interface Message extends v.InferInput<typeof NewMessageInputSchema> {
  id: number
  user_id: number
  create_time: string
}

export type MessageResponse = Message & Omit<User, 'salted_hash' | 'id'>
