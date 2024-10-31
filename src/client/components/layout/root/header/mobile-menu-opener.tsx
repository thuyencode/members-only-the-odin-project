import { Icon } from '@iconify/react'

const MobileMenuOpener = () => {
  return (
    <label
      htmlFor='mobile-menu-toggle'
      className='drawer-button'
      aria-label='open mobile menu'
    >
      <Icon className='text-xl' icon={'mdi:hamburger-open'} />
    </label>
  )
}

export default MobileMenuOpener
