import useSignOut from '@/client/hooks/use-sign-out'
import { Link } from '@tanstack/react-router'
import { createPortal } from 'react-dom'
import WhenAuthenticatedOrNot from '../../when-authenticated-or-not'
import MobileMenuCloser from './mobile-menu-closer'
import ThemeToggler from './theme-toggler'
import UserBadge from './user-badge'

const MobileMenu = () => {
  const { signOut } = useSignOut()

  return createPortal(
    <ul className='menu min-h-full w-80 bg-base-200 p-4 text-base-content'>
      <li>
        <MobileMenuCloser />
      </li>

      <li>
        <Link to='/'>Home</Link>
      </li>

      <WhenAuthenticatedOrNot
        whenAuthenticated={
          <>
            <li>
              <Link className='font-semibold text-primary' to='/new'>
                New Message
              </Link>
            </li>
            <li>
              <button
                className='link link-secondary no-underline'
                onClick={signOut}
              >
                Sign Out
              </button>
            </li>
          </>
        }
        whenNotAuthenticated={
          <>
            <li>
              <Link to='/sign-up'>Sign Up</Link>
            </li>
            <li>
              <Link className='font-semibold text-primary' to='/sign-in'>
                Sign In
              </Link>
            </li>
          </>
        }
      />

      <li>
        <ThemeToggler />
      </li>

      <WhenAuthenticatedOrNot
        whenAuthenticated={
          <li>
            <UserBadge />
          </li>
        }
      />
    </ul>,
    document.getElementById('mobile-menu') as HTMLDivElement
  )
}

export default MobileMenu
