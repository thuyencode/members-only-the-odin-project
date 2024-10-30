import type {
  AccessTokenResponse,
  SignInInput,
  SignUpInput
} from '@/shared/types/auth.type'
import baseApi from './baseApi'

const authApi = baseApi.extend((options) => ({
  prefixUrl: `${options.prefixUrl}/auth`
}))

export const postSignUpRequest = async (
  signUpInput: SignUpInput
): Promise<AccessTokenResponse> => {
  return await authApi
    .post('sign-up', { json: signUpInput })
    .json<AccessTokenResponse>()
}

export const postSignInRequest = async (
  signInInput: SignInInput
): Promise<AccessTokenResponse> => {
  return await authApi
    .post('sign-in', { json: signInInput })
    .json<AccessTokenResponse>()
}

export const getSignOutRequest = async (): Promise<void> => {
  await authApi.get('sign-out')
}
