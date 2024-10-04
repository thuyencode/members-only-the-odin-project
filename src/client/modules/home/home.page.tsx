import { Icon } from '@iconify/react'

const HomePage = () => {
  return (
    <div className='space-y-6 text-center'>
      <div className='space-y-2'>
        <h2>There're no messages yet 📭️</h2>
        <p>Why don't you be the first one to break the silence? ✍️💌</p>
      </div>

      <button className='btn btn-primary mt-4 text-lg'>
        New message <Icon className='text-lg' icon='mdi:message-plus' />
      </button>
    </div>
  )
}

export default HomePage
