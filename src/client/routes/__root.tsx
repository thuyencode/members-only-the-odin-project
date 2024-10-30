import { createRootRouteWithContext } from '@tanstack/react-router'
import { RootLayout } from '../components'
import { RouterContext } from '../libs/types'

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout
})
