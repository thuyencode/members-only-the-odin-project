import WhenAuthenticatedOrNot from '@/client/components/when-authenticated-or-not'
import useSignOut from '@/client/hooks/use-sign-out'
import { Link } from '@tanstack/react-router'
import ThemeToggler from '../theme-toggler'
import UserBadge from '../user-badge'
import MobileMenuOpener from './mobile-menu-opener'

const Header = () => {
  const { signOut } = useSignOut()

  return (
    <header className='navbar h-8 border-b border-b-neutral/50 bg-base-100'>
      <div className='navbar-start'>
        <h4 className='ml-2 font-bold'>Members Only</h4>
      </div>

      <div className='navbar-center'>
        <ul className='menu menu-horizontal items-center gap-1 max-lg:hidden'>
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
        </ul>
      </div>

      <div className='navbar-end'>
        <ul className='menu menu-horizontal items-center max-lg:hidden'>
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
        </ul>
        <ul className='menu menu-horizontal items-center lg:hidden'>
          <li>
            <MobileMenuOpener />
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
