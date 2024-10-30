import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import type { FunctionComponent } from 'react'

// Import the generated route tree
import useAuth from './hooks/use-auth'
import { routeTree } from './routeTree.gen'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    },
    mutations: {
      retry: false
    }
  }
})

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: { queryClient, isAuthenticated: undefined },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0
})

// Register things for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const RouterProviderWithContext = () => {
  const { isAuthenticated } = useAuth()

  return <RouterProvider router={router} context={{ isAuthenticated }} />
}

const App: FunctionComponent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProviderWithContext />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
