import SignInPage from '@/client/modules/(auth)/sign-in'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(auth)/sign-in')({
  component: SignInPage
})
