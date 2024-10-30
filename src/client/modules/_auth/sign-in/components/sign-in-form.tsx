import { FieldInfo } from '@/client/components'
import ErrorDialog from '@/client/components/error-dialog'
import useSignIn from '@/client/hooks/use-sign-in'
import { capitalize } from '@/client/libs/utils'
import { SignInSchema } from '@/shared/schemas/auth.schema'
import { Icon } from '@iconify/react'
import { useForm } from '@tanstack/react-form'
import { Link } from '@tanstack/react-router'
import { valibotValidator } from '@tanstack/valibot-form-adapter'

const SignInForm = () => {
  const { signIn, signInError, isSignInError } = useSignIn()

  const form = useForm({
    defaultValues: {
      username: '',
      password: ''
    },
    validatorAdapter: valibotValidator(),
    validators: { onSubmit: SignInSchema },
    onSubmit: async ({ value }) => {
      await signIn(value)
    }
  })

  return (
    <>
      <ErrorDialog isError={isSignInError} error={signInError} />

      <div className='mx-auto max-w-md space-y-10'>
        <h2 className='text-center'>Sign in to your account</h2>

        <form
          className='space-y-2.5'
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            void form.handleSubmit()
          }}
        >
          <form.Field
            name='username'
            children={(field) => (
              <div className='space-y-2.5'>
                <label
                  className={`input input-bordered flex items-center gap-2 ${field.state.meta.errors.length && 'input-error'}`}
                >
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
                <label
                  className={`input input-bordered flex items-center gap-2 ${field.state.meta.errors.length && 'input-error'}`}
                >
                  <Icon className='text-lg' icon='mdi:key' />
                  <input
                    name={field.name}
                    type='password'
                    placeholder={capitalize(field.name)}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    minLength={8}
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
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                  <Icon className='text-lg' icon={'mdi:login'} />
                </button>
              )}
            />

            <Link className='btn btn-ghost font-medium' to={'/sign-up'}>
              I don't have an account
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default SignInForm
