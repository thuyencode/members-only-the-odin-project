import useMessages from '@/client/hooks/use-messages'
import ShowMessages from './components/messages'
import NoMessages from './components/no-messages'

const HomePage = () => {
  const { messages } = useMessages()

  if (messages && messages.length) {
    return <ShowMessages messages={messages} />
  } else {
    return <NoMessages />
  }
}

export default HomePage
