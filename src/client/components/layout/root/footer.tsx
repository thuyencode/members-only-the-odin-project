import { Icon } from '@iconify/react'

const Footer = () => {
  return (
    <footer className='footer footer-center bg-base-300 p-3 text-base-content'>
      <aside>
        <a
          className='link-hover link inline-flex items-center gap-1 font-semibold'
          href='https://github.com/thuyencode/members-only-the-odin-project'
        >
          <Icon className='text-xl' icon='mdi:copyright' /> THUYEN CODE
        </a>
      </aside>
    </footer>
  )
}

export default Footer
