import { FunctionComponent } from 'react'
import { IMessage } from '../../types'
import Message from './message'

interface ShowMessagesProps {
  messages: IMessage[]
}

const ShowMessages: FunctionComponent<ShowMessagesProps> = ({ messages }) => {
  return (
    <div className='space-y-5'>
      {messages.map((message) => (
        <Message
          key={`${message.username}+${message.added_at.toString()}`}
          {...message}
        />
      ))}
    </div>
  )
}

export default ShowMessages
