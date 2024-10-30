import type { ErrorResponse } from '@/shared/types'
import { Icon } from '@iconify/react'
import { HTTPError } from 'ky'
import { useEffect, useRef, useState } from 'react'

interface ErrorDialogProps {
  isError: boolean
  error: Error | null
}

function ErrorDialog({ isError, error }: ErrorDialogProps) {
  const ref = useRef<HTMLDialogElement | null>(null)
  const [err, setErr] = useState<Error | null>(error)

  useEffect(() => {
    if (ref.current === null) {
      return
    }

    if (isError) {
      ref.current.showModal()
    } else {
      ref.current.close()
    }
  }, [isError])

  useEffect(() => {
    const handleKyHTTPError = async () => {
      if (error instanceof HTTPError) {
        const { response } = error

        const data = await response.json<ErrorResponse>()

        let message = ''

        if (data.error.cause) {
          const cause = data.error.cause

          if (typeof cause === 'string') {
            message = cause
          } else {
            Object.keys(cause).forEach((key) => {
              let errorMessages = ''

              cause[key].forEach((value, index, arr) => {
                let errorMessage = ''

                if (index === arr.length - 1) {
                  errorMessage += value
                } else {
                  errorMessage += `${value}, `
                }
              })

              message += `${key}: ${errorMessages}.`
            })
          }
        }

        setErr({
          name: `Http Status ${data.error.statusCode} - ${data.error.message}`,
          message
        })
      }
    }

    handleKyHTTPError()
  }, [error])

  function closeModal() {
    if (ref.current === null) {
      return
    }

    ref.current.close()
  }

  return (
    <dialog className='modal' ref={ref}>
      <div className='modal-box p-4 text-center'>
        <h3 className='text-lg'>{err?.name}</h3>
        <p className='pt-4 text-error'>{err?.message}</p>

        <button
          className='btn btn-circle btn-ghost btn-sm absolute right-3.5 top-3.5'
          onClick={closeModal}
        >
          <Icon icon={'mdi:close'} />
        </button>
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  )
}

export default ErrorDialog
