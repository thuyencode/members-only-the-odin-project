import useCloseDialogElement from '@/client/hooks/useCloseDetailsElement'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { themeChange } from 'theme-change'

const TOGGLE_STATES = {
  default: { name: 'system', icon: 'mdi:computer', theme: '' },
  light: { name: 'light', icon: 'ph:sun-fill', theme: 'light' },
  dark: { name: 'dark', icon: 'ph:moon-fill', theme: 'dark' }
}

const ThemeToggle = () => {
  const ref = useCloseDialogElement()

  const [toggleState, setToggleState] = useState(TOGGLE_STATES.default)

  useEffect(() => {
    themeChange(false)
  }, [])

  useEffect(() => {
    const theme = localStorage.getItem('theme') as 'light' | 'dark' | ''

    setToggleState(TOGGLE_STATES[theme === '' ? 'default' : theme])
  }, [])

  return (
    <details className='dropdown-end md:dropdown' ref={ref}>
      <summary className='gap-2 capitalize'>
        <Icon className='text-xl' icon={toggleState.icon} />
        {toggleState.name}
      </summary>

      <ul className='border-base-content/50 md:menu md:dropdown-content md:z-[1] md:w-40 md:rounded-box md:border md:bg-base-300 md:p-2 md:shadow-lg'>
        {Object.values(TOGGLE_STATES).map((state) => (
          <li key={state.name}>
            <button
              className='capitalize'
              data-set-theme={state.theme}
              data-act-class='ACTIVECLASS'
              onClick={() => {
                setToggleState(state)
              }}
            >
              <Icon className='text-xl' icon={state.icon} />
              {state.name}
            </button>
          </li>
        ))}
      </ul>
    </details>
  )
}

export default ThemeToggle
