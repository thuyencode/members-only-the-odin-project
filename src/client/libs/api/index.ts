import type { Message, MessagesResponse, NewMessageInput } from '@/shared/types'
import type { AccessTokenResponse } from '@/shared/types/auth.type'
import baseApi from './baseApi'

export const getAccessTokenApi = async (): Promise<AccessTokenResponse> => {
  return await baseApi.get('get-access-token').json<AccessTokenResponse>()
}

export const getMessagesApi = async (): Promise<MessagesResponse> => {
  return await baseApi.get('messages').json<MessagesResponse>()
}

export const postMessagesApi = async (
  newMessage: NewMessageInput
): Promise<Message> => {
  return await baseApi
    .post('protected/messages', { json: newMessage })
    .json<Message>()
}
