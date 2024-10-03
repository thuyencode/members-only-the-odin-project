import { Icon } from '@iconify/react'
import { Link } from '@tanstack/react-router'
import { FunctionComponent } from 'react'

interface AuthFormProps {
  action?: 'sign-in' | 'sign-up'
}

const AuthForm: FunctionComponent<AuthFormProps> = ({ action = 'sign-in' }) => {
  return (
    <div className='mx-auto max-w-md space-y-10'>
      <h2 className='text-center'>
        {action === 'sign-in'
          ? 'Sign in to your account'
          : 'Sign up a new account'}
      </h2>

      <form
        className='space-y-2.5'
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        {action === 'sign-up' ? (
          <label className='input input-bordered flex items-center gap-2'>
            <Icon className='text-lg' icon='mdi:user' />
            <input type='text' placeholder='Name' />
          </label>
        ) : null}

        <label className='input input-bordered flex items-center gap-2'>
          <Icon className='text-lg' icon='mdi:alternate-email' />
          <input type='text' placeholder='Username' />
        </label>

        <label className='input input-bordered flex items-center gap-2'>
          <Icon className='text-lg' icon='mdi:key' />
          <input type='password' placeholder='Password' defaultValue='' />
        </label>

        <div className='flex justify-center gap-1 pt-2.5'>
          <button className='btn btn-primary gap-1' type='submit'>
            {action === 'sign-in' ? 'Sign in' : 'Sign up'}

            <Icon
              className='text-lg'
              icon={action === 'sign-in' ? 'mdi:login' : 'mdi:user-add'}
            />
          </button>

          <Link className='btn btn-ghost font-medium' to='/sign-up'>
            {action === 'sign-in'
              ? 'I already have an account'
              : "I don't have an account"}
          </Link>
        </div>
      </form>
    </div>
  )
}

export default AuthForm
