// https://tanstack.com/form/latest/docs/overview#enough-talk-show-me-some-code-already
import { FieldApi } from '@tanstack/react-form'
import { FunctionComponent, useId } from 'react'

interface FieldInfoProps {
  field: FieldApi<any, any, any, any>
}

const FieldInfo: FunctionComponent<FieldInfoProps> = ({ field }) => {
  const id = useId()
  const { isTouched, isValidating } = field.state.meta
  const errors = field.state.meta.errors[0]?.toString().split(', ')

  return (
    <>
      {isTouched && errors ? (
        <ul
          className={`list-inside ${errors.length > 1 && 'list-disc'} text-error`}
        >
          {errors.map((error) => (
            <li key={`${error}-${id}`}>{error}</li>
          ))}
        </ul>
      ) : null}

      {isValidating && 'Validating...'}
    </>
  )
}

export default FieldInfo
