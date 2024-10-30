import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  beforeLoad: ({ context }) => {
    const { isAuthenticated } = context

    if (!isAuthenticated) {
      return redirect({ to: '/sign-in' })
    }
  },
  component: Outlet
})
