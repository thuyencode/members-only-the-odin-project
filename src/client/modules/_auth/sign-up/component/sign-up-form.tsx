import { capitalize } from '@/client/libs/utils'
import { SignUpSchema } from '@/shared/schemas/auth.schema'
import { Icon } from '@iconify/react'
import { useForm } from '@tanstack/react-form'
import { Link } from '@tanstack/react-router'
import { valibotValidator } from '@tanstack/valibot-form-adapter'
import { FieldInfo } from '../../components'

const SignUpForm = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      username: '',
      password: ''
    },
    validatorAdapter: valibotValidator(),
    validators: { onSubmit: SignUpSchema },
    onSubmit: async ({ value }) => {
      console.log(value)
    }
  })

  return (
    <div className='mx-auto max-w-md space-y-10'>
      <h2 className='text-center'>Sign up a new account</h2>

      <form
        className='space-y-2.5'
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <form.Field
          name='name'
          children={(field) => (
            <div className='space-y-2.5'>
              <label className='input input-bordered flex items-center gap-2'>
                <Icon className='text-lg' icon='mdi:user' />
                <input
                  name={field.name}
                  type='text'
                  placeholder={capitalize(field.name)}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  minLength={2}
                  maxLength={100}
                  required
                />
              </label>

              <FieldInfo field={field} />
            </div>
          )}
        />

        <form.Field
          name='username'
          children={(field) => (
            <div className='space-y-2.5'>
              <label className='input input-bordered flex items-center gap-2'>
                <Icon className='text-lg' icon='mdi:alternate-email' />
                <input
                  name={field.name}
                  type='text'
                  placeholder={capitalize(field.name)}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  minLength={2}
                  maxLength={25}
                  required
                />
              </label>

              <FieldInfo field={field} />
            </div>
          )}
        />

        <form.Field
          name='password'
          children={(field) => (
            <div className='space-y-2.5'>
              <label className='input input-bordered flex items-center gap-2'>
                <Icon className='text-lg' icon='mdi:key' />
                <input
                  name={field.name}
                  type='password'
                  placeholder={capitalize(field.name)}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  minLength={2}
                  maxLength={30}
                  required
                />
              </label>

              <FieldInfo field={field} />
            </div>
          )}
        />

        <div className='flex justify-center gap-1 pt-2.5'>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button
                className='btn btn-primary gap-1'
                type='submit'
                disabled={!canSubmit || isSubmitting}
              >
                {isSubmitting ? 'Signing up...' : 'Sign up'}
                <Icon className='text-lg' icon={'mdi:user-add'} />
              </button>
            )}
          />

          <Link className='btn btn-ghost font-medium' to={'/sign-in'}>
            I already have an account
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm
