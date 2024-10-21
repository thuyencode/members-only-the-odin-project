import type { SignInInput, SignUpInput } from '@/shared/types/auth.type'
import baseApi from './baseApi'

const authApi = baseApi.extend((options) => ({
  prefixUrl: `${options.prefixUrl}/auth`
}))

export const postSignUpRequest = async (
  signUpInput: SignUpInput
): Promise<unknown> => {
  return await authApi.post('/sign-up', { json: signUpInput }).json()
}

export const postSignInRequest = async (
  signInInput: SignInInput
): Promise<unknown> => {
  return await authApi.post('/sign-in', { json: signInInput }).json()
}

export const postSignOutRequest = async (): Promise<void> => {
  await authApi.post('/sign-out')
}
