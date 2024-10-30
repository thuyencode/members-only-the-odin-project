import { SignInInput } from '@/shared/types/auth.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { postSignInRequest } from '../libs/api/auth.api'
import { QUERY_KEYS } from '../libs/constants'

const useSignIn = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const signInMutation = useMutation({
    mutationFn: async (signInInput: SignInInput) =>
      await postSignInRequest(signInInput),
    onSuccess: async (data) => {
      queryClient.setQueryData([QUERY_KEYS.AUTH], data)

      await router.invalidate()
      await router.navigate({ to: '/' })
    },
    onError: async () => {
      queryClient.setQueryData([QUERY_KEYS.AUTH], null)

      await router.invalidate()
    }
  })

  return {
    signIn: signInMutation.mutateAsync,
    signInError: signInMutation.error,
    isSignInError: signInMutation.isError
  }
}

export default useSignIn
