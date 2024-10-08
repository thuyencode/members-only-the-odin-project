import NewMessagePage from '@/client/modules/_protected/new-message'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected/(new-message)/new/')({
  component: NewMessagePage
})
