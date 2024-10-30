import { SignUpInput } from '@/shared/types/auth.type'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { queryClient } from '../app'
import { postSignUpRequest } from '../libs/api/auth.api'
import { QUERY_KEYS } from '../libs/constants'

const useSignUp = () => {
  const router = useRouter()

  const signUpMutation = useMutation({
    mutationFn: async (signUpInput: SignUpInput) =>
      await postSignUpRequest(signUpInput),
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
    signUp: signUpMutation.mutateAsync,
    signUpError: signUpMutation.error,
    isSignUpError: signUpMutation.isError
  }
}

export default useSignUp
