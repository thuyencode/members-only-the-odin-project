import type { User } from '@/shared/types'
import type { SignInInput, SignUpInput } from '@/shared/types/auth.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { redirect, useRouter } from '@tanstack/react-router'
import type { JwtPayload } from 'jsonwebtoken'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useMemo } from 'react'
import { getAccessTokenApi } from '../libs/api'
import { postSignInRequest, postSignUpRequest } from '../libs/api/auth.api'
import { QUERY_KEYS, SESSION_STORAGE_KEYS } from '../libs/constants'

const useAuth = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.AUTH],
    queryFn: getAccessTokenApi,
    initialData: {
      accessToken: sessionStorage.getItem(SESSION_STORAGE_KEYS.ACCESS_TOKEN)
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })

  useEffect(() => {
    const accessToken = data?.accessToken

    if (!accessToken) {
      sessionStorage.removeItem(SESSION_STORAGE_KEYS.ACCESS_TOKEN)
    } else {
      sessionStorage.setItem(SESSION_STORAGE_KEYS.ACCESS_TOKEN, accessToken)
    }
  }, [data])

  const user = useMemo<Omit<User, 'salted_hash'> | null>(() => {
    const accessToken = data?.accessToken

    let user: Omit<User, 'salted_hash'> | null = null

    if (accessToken) {
      const decoded = jwtDecode<JwtPayload>(accessToken)

      user = {
        id: decoded.id,
        name: decoded.name,
        username: decoded.username
      }
    }

    return user
  }, [data])

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

  const signOut = async () => {
    queryClient.setQueryData([QUERY_KEYS.AUTH], null)

    await router.invalidate()
    await redirect({ to: '/' })
  }

  const isAuthenticated = Boolean(user)

  return {
    user,
    signUpMutation,
    signIn: signInMutation.mutateAsync,
    signInError: signInMutation.error,
    isSignInError: signInMutation.isError,
    signUp: signUpMutation.mutateAsync,
    signUpError: signUpMutation.error,
    isSignUpError: signUpMutation.isError,
    signOut,
    isAuthenticated
  }
}

export default useAuth
