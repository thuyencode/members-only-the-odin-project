import * as v from 'valibot'

export const NewMessageInputSchema = v.object({
  message: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(10, 'Message must be at least 10 characters'),
    v.maxLength(500, 'Message must not exceed 500 characters')
  )
})
