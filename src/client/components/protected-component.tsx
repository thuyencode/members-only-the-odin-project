import { Navigate } from '@tanstack/react-router'
import type { PropsWithChildren } from 'react'
import useAuth from '../hooks/use-auth'

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return { children }
  } else {
    return <Navigate to='/sign-in' />
  }
}

export default ProtectedRoute
