import useAuth from '@/client/hooks/use-auth'

const UserBadge = () => {
  const { user } = useAuth()

  return <span className='link link-info no-underline'>@{user?.username}</span>
}

export default UserBadge
