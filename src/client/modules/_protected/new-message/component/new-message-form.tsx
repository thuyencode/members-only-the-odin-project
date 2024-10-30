import { FieldInfo } from '@/client/components'
import ErrorDialog from '@/client/components/error-dialog'
import useMessages from '@/client/hooks/use-messages'
import { capitalize } from '@/client/libs/utils'
import { NewMessageInputSchema } from '@/shared/schemas/message.schema'
import { Icon } from '@iconify/react'
import { useForm } from '@tanstack/react-form'
import { Link } from '@tanstack/react-router'
import { valibotValidator } from '@tanstack/valibot-form-adapter'
import TextareaAutosize from 'react-textarea-autosize'

const NewMessageForm = () => {
  const {
    submitNewMessage,
    isErrorWhenSubmittingMessage,
    errorWhenSubmittingMessage
  } = useMessages()
  const form = useForm({
    defaultValues: {
      message: ''
    },
    validatorAdapter: valibotValidator(),
    validators: { onSubmit: NewMessageInputSchema },
    onSubmit: async ({ value }) => {
      await submitNewMessage(value)
    }
  })

  return (
    <>
      <ErrorDialog
        isError={isErrorWhenSubmittingMessage}
        error={errorWhenSubmittingMessage}
      />

      <div className='mx-auto max-w-md space-y-10'>
        <h2 className='text-center'>Send a new message</h2>

        <form
          className='space-y-2.5 text-center'
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            void form.handleSubmit()
          }}
        >
          <form.Field
            name='message'
            children={(field) => (
              <>
                <div className='textarea-bordered rounded-lg border'>
                  <TextareaAutosize
                    className={`textarea min-h-28 ${field.state.meta.errors.length && 'textarea-error'} w-full`}
                    name={field.name}
                    placeholder={capitalize(field.name)}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    minLength={10}
                    maxLength={500}
                    required
                  />
                  <div className='pb-1 pr-2 text-right'>
                    {field.state.value.length}/500
                  </div>
                </div>

                <FieldInfo field={field} />
              </>
            )}
          />

          <div className='space-y-1 pt-2.5'>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <button
                  className='btn btn-primary w-full gap-1'
                  type='submit'
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send'}
                  <Icon className='text-lg' icon={'mdi:email-fast'} />
                </button>
              )}
            />

            <Link
              className='btn btn-outline btn-error w-full gap-1 font-medium'
              to={'/'}
            >
              Cancel
              <Icon className='text-lg' icon={'mdi:cancel-bold'} />
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default NewMessageForm
