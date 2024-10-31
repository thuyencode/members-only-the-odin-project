import { Icon } from '@iconify/react'

const MobileMenuCloser = () => {
  return (
    <label
      htmlFor='mobile-menu-toggle'
      className='drawer-button'
      aria-label='open mobile menu'
    >
      <Icon className='text-xl' icon={'mdi:hamburger-close'} />
    </label>
  )
}

export default MobileMenuCloser
