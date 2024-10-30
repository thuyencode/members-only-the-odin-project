import useAuth from '@/client/hooks/use-auth'
import { Link } from '@tanstack/react-router'
import ThemeToggler from './theme-toggler'

const Header = () => {
  const { isAuthenticated, signOut, user } = useAuth()

  return (
    <header className='navbar h-8 border-b border-b-neutral/50 bg-base-100'>
      <div className='navbar-start'>
        <h4 className='ml-2 font-bold'>Members Only</h4>
      </div>

      <div className='navbar-center'>
        <ul className='menu menu-horizontal items-center gap-1'>
          <li>
            <Link to='/'>Home</Link>
          </li>

          {!isAuthenticated ? (
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
          ) : null}

          {isAuthenticated ? (
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
          ) : null}
        </ul>
      </div>

      <div className='navbar-end'>
        <ul className='menu menu-horizontal items-center'>
          <li>
            <ThemeToggler />
          </li>
          {isAuthenticated ? (
            <li>
              <p className='btn btn-link'>@{user?.username}</p>
            </li>
          ) : null}
        </ul>
      </div>
    </header>
  )
}

export default Header
