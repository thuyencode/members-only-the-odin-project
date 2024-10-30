import { FieldInfo } from '@/client/components'
import ErrorDialog from '@/client/components/error-dialog'
import useSignUp from '@/client/hooks/use-sign-up'
import { capitalize } from '@/client/libs/utils'
import { SignUpSchema } from '@/shared/schemas/auth.schema'
import { Icon } from '@iconify/react'
import { useForm } from '@tanstack/react-form'
import { Link } from '@tanstack/react-router'
import { valibotValidator } from '@tanstack/valibot-form-adapter'

const SignUpForm = () => {
  const { signUp, signUpError, isSignUpError } = useSignUp()

  const form = useForm({
    defaultValues: {
      name: '',
      username: '',
      password: ''
    },
    validatorAdapter: valibotValidator(),
    validators: { onSubmit: SignUpSchema },
    onSubmit: async ({ value }) => {
      await signUp(value)
    }
  })

  return (
    <>
      <ErrorDialog isError={isSignUpError} error={signUpError} />

      <div className='mx-auto max-w-md space-y-10'>
        <h2 className='text-center'>Sign up a new account</h2>

        <form
          className='space-y-2.5'
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            void form.handleSubmit()
          }}
        >
          <form.Field
            name='name'
            children={(field) => (
              <div className='space-y-2.5'>
                <label
                  className={`input input-bordered flex items-center gap-2 ${field.state.meta.errors.length && 'input-error'}`}
                >
                  <Icon className='text-lg' icon='mdi:user' />
                  <input
                    name={field.name}
                    type='text'
                    placeholder={capitalize(field.name)}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    minLength={8}
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
    </>
  )
}

export default SignUpForm
