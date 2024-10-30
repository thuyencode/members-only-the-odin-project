import { queryClient } from '@/client/app'
import type { AccessTokenResponse } from '@/shared/types/auth.type'
import { HttpStatus } from 'http-status-ts'
import ky, { HTTPError } from 'ky'
import { QUERY_KEYS, SESSION_STORAGE_KEYS } from '../constants'

const baseApi = ky.create({
  prefixUrl: `http://localhost:${import.meta.env.VITE_PORT}/api`,
  credentials: 'include',
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = sessionStorage.getItem(
          SESSION_STORAGE_KEYS.ACCESS_TOKEN
        )

        if (!accessToken) return

        request.headers.set('Authorization', `Bearer ${accessToken}`)
      }
    ],
    beforeRetry: [
      async ({ request, error, options }) => {
        if (
          error instanceof HTTPError &&
          error.response.status === Number(HttpStatus.UNAUTHORIZED)
        ) {
          const data = await ky
            .get('get-access-token', { ...options, retry: 0 })
            .json<AccessTokenResponse>()

          queryClient.setQueryData([QUERY_KEYS.AUTH], data.accessToken)

          request.headers.set('Authorization', `Bearer ${data.accessToken}`)
        }
      }
    ]
  },
  retry: {
    limit: 1,
    statusCodes: [
      HttpStatus.UNAUTHORIZED,
      HttpStatus.INTERNAL_SERVER_ERROR,
      HttpStatus.BAD_REQUEST
    ]
  }
})

export default baseApi
