import useCloseDialogElement from '@/client/hooks/use-close-details-element'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { themeChange } from 'theme-change'

const TOGGLE_STATES = {
  default: { name: 'system', icon: 'mdi:computer', theme: '' },
  light: { name: 'light', icon: 'ph:sun-fill', theme: 'light' },
  dark: { name: 'dark', icon: 'ph:moon-fill', theme: 'dark' }
}

const ThemeToggler = () => {
  const ref = useCloseDialogElement()
  const [toggleState, setToggleState] = useState(TOGGLE_STATES.default)

  useEffect(() => {
    themeChange(false)
  }, [])

  useEffect(() => {
    const theme = localStorage.getItem('theme') as 'light' | 'dark' | ''

    setToggleState(TOGGLE_STATES[!theme ? 'default' : theme])
  }, [])

  return (
    <details className='lg:dropdown lg:dropdown-end' ref={ref}>
      <summary className='gap-2 capitalize'>
        <Icon className='text-xl' icon={toggleState.icon} />
        <span>{toggleState.name}</span>
      </summary>

      <ul className='border-base-content/50 lg:menu lg:dropdown-content lg:z-[1] lg:w-40 lg:rounded-box lg:border lg:bg-base-300 lg:p-2 lg:shadow-lg'>
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

export default ThemeToggler
