import SignInPage from '@/client/modules/_auth/sign-in'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/sign-in')({
  component: SignInPage
})
