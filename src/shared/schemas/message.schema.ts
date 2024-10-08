import * as v from 'valibot'

export const MessageSchema = v.pipe(
  v.string(),
  v.trim(),
  v.minLength(10, 'Message must be at least 10 characters'),
  v.maxLength(255, 'Message must not exceed 255 characters')
)
