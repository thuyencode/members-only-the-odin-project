import { Link } from '@tanstack/react-router'
import ThemeToggler from './theme-toggler'

const Header = () => {
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

          <li>
            <Link to='/sign-up'>Sign Up</Link>
          </li>

          <li>
            <Link to='/sign-in'>Sign In</Link>
          </li>

          <li>
            <Link className='font-semibold text-primary' to='/new'>
              New Message
            </Link>
          </li>
        </ul>
      </div>

      <div className='navbar-end'>
        <ul className='menu menu-horizontal items-center'>
          <li>
            <ThemeToggler />
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
