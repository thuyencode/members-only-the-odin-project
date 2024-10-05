import SignUpPage from '@/client/modules/(auth)/sign-up'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/sign-up')({
  component: SignUpPage,
})
