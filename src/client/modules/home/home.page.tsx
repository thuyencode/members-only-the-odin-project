import ShowMessages from './components/messages'
import NoMessages from './components/no-messages'
import messages from './db/messages.json'

const HomePage = () => {
  if (messages.length) {
    return <ShowMessages messages={messages} />
  } else {
    return <NoMessages />
  }
}

export default HomePage
