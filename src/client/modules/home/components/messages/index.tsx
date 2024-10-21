import type { MessageResponse } from '@/shared/types'
import type { FunctionComponent } from 'react'
import MessageComp from './message'

interface ShowMessagesProps {
  messages: MessageResponse[]
}

const ShowMessages: FunctionComponent<ShowMessagesProps> = ({ messages }) => {
  return (
    <div className='space-y-5'>
      {messages.map((message) => (
        <MessageComp
          key={`${message.username}+${message.create_time.toString()}`}
          {...message}
        />
      ))}
    </div>
  )
}

export default ShowMessages
