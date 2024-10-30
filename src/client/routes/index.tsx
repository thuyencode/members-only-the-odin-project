import { createFileRoute } from '@tanstack/react-router'
import { getMessagesQueryOptions } from '../hooks/use-messages'

export const Route = createFileRoute('/')({
  loader: ({ context }) => {
    const { queryClient } = context

    queryClient.ensureQueryData(getMessagesQueryOptions)
  }
})
