import type { MessageResponse } from '@/shared/types'
import type { FunctionComponent } from 'react'

const MessageComp: FunctionComponent<MessageResponse> = ({
  name,
  username,
  message,
  create_time
}) => {
  return (
    <div className='mx-auto max-w-2xl space-y-2.5 rounded-box border border-neutral-content/50 bg-neutral p-5 text-neutral-content'>
      <div className='flex justify-between'>
        <span>
          {name} <code>@{username}</code>
        </span>
        <span className='italic'>{new Date(create_time).toLocaleString()}</span>
      </div>

      <h4 className='rounded-md bg-white p-2.5 text-slate-800'>{message}</h4>
    </div>
  )
}

export default MessageComp
