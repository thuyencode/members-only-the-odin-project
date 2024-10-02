import { Icon } from '@iconify/react'
import { createLazyFileRoute, Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(auth)/sign-in')({
  component: () => (
    <div className='mx-auto max-w-md space-y-10'>
      <h2 className='text-center'>Sign in to your account</h2>

      <form className='space-y-2.5' action=''>
        <label className='input input-bordered flex items-center gap-2'>
          <Icon className='text-lg' icon='mdi:alternate-email' />

          <input type='text' placeholder='Username' />
        </label>

        <label className='input input-bordered flex items-center gap-2'>
          <Icon className='text-lg' icon='mdi:key' />
          <input type='password' placeholder='Password' value='' />
        </label>

        <div className='flex justify-center gap-2.5 pt-2.5'>
          <button className='btn btn-primary gap-1'>
            Sign in <Icon className='text-lg' icon='mdi:login' />
          </button>

          <Link className='btn btn-ghost font-medium' to='/sign-up'>
            I don't have an account
          </Link>
        </div>
      </form>
    </div>
  )
})
