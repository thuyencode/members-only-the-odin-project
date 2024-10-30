import { NewMessageInput } from '@/shared/types'
import {
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery
} from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'
import { getMessagesApi, postMessagesApi } from '../libs/api'
import { QUERY_KEYS } from '../libs/constants'
import useAuth from './use-auth'

export const getMessagesQueryOptions = queryOptions({
  queryKey: [QUERY_KEYS.MESSAGES],
  queryFn: getMessagesApi
})

const useMessages = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const router = useRouter()
  const { data: messages } = useSuspenseQuery(getMessagesQueryOptions)

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MESSAGES] })
  }, [user])

  const messagesMutation = useMutation({
    mutationKey: [QUERY_KEYS.MESSAGES],
    mutationFn: async (newMessage: NewMessageInput) =>
      await postMessagesApi(newMessage),
    onSuccess: async () => {
      await router.invalidate()
      await router.navigate({ to: '/' })
    }
  })

  return {
    messages,
    submitNewMessage: messagesMutation.mutateAsync,
    isErrorWhenSubmittingMessage: messagesMutation.isError,
    errorWhenSubmittingMessage: messagesMutation.error
  }
}

export default useMessages
