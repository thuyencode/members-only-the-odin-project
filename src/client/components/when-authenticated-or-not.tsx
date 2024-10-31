import useAuth from '@/client/hooks/use-auth'
import { FunctionComponent, ReactNode } from 'react'

interface WhenAuthenticatedOrNotProps {
  whenAuthenticated: ReactNode
  whenNotAuthenticated?: ReactNode
}

const WhenAuthenticatedOrNot: FunctionComponent<
  WhenAuthenticatedOrNotProps
> = ({ whenAuthenticated, whenNotAuthenticated = null }) => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return whenAuthenticated
  }

  return whenNotAuthenticated
}

export default WhenAuthenticatedOrNot
