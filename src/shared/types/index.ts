import type * as v from 'valibot'
import type { NewMessageInputSchema } from '../schemas/message.schema'
import type { SignUpInput } from './auth.type'

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

export type MessagesResponse = MessageResponse[]

export interface ErrorResponse {
  error: {
    statusCode: number
    message: string
    cause?: string | { [key: string]: string[] }
  }
}

export type NewMessageInput = v.InferInput<typeof NewMessageInputSchema>
