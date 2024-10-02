import { Link } from '@tanstack/react-router'

const Header = () => {
  return (
    <header className='navbar h-8 border-b border-b-neutral/50 bg-base-100'>
      <div className='flex-1'>
        <a className='btn btn-ghost text-xl'>Members Only</a>
      </div>

      <div className='flex-none'>
        <ul className='menu menu-horizontal items-center'>
          <li>
            <Link to='/'>Home</Link>
          </li>

          <li>
            <Link to='/sign-up'>Sign Up</Link>
          </li>

          <li>
            <Link to='/sign-in'>Sign In</Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
