import type { User } from '@/shared/types'
import { useQuery } from '@tanstack/react-query'
import type { JwtPayload } from 'jsonwebtoken'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useMemo } from 'react'
import { getAccessTokenApi } from '../libs/api'
import { QUERY_KEYS, SESSION_STORAGE_KEYS } from '../libs/constants'

const useAuth = () => {
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
      try {
        const decoded = jwtDecode<JwtPayload>(accessToken)

        user = {
          id: decoded.id,
          name: decoded.name,
          username: decoded.username
        }
      } catch (error) {
        return user
      }
    }

    return user
  }, [data])

  const isAuthenticated = Boolean(user)

  return { user, isAuthenticated }
}

export default useAuth
