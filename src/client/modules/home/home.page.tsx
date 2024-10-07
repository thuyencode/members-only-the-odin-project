import ShowMessages from './components/messages'
import NoMessages from './components/no-messages'
import messages from './db/messages.json'

const HomePage = () => {
  const messagesWithDate = messages.map((message) => ({
    ...message,
    added_at: new Date(message.added_at)
  }))

  if (messagesWithDate.length) {
    return <ShowMessages messages={messagesWithDate} />
  } else {
    return <NoMessages />
  }
}

export default HomePage
