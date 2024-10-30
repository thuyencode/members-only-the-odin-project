import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { QUERY_KEYS } from '../libs/constants'

const useSignOut = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const signOut = async () => {
    queryClient.setQueryData([QUERY_KEYS.AUTH], null)

    await router.invalidate()
    await router.navigate({ to: '/' })
  }

  return { signOut }
}

export default useSignOut
