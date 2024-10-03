import {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useRef
} from 'react'

// With the help from https://dev.to/phuocng/use-forwardref-with-a-higher-order-component-159o
const withClose = (
  Component: ForwardRefExoticComponent<RefAttributes<HTMLDetailsElement>>
) => {
  const WrappedComponent = () => {
    const ref = useRef<HTMLDetailsElement | null>(null)

    useEffect(() => {
      if (!ref.current) {
        return
      }

      const detailsEle = ref.current

      function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape' && detailsEle.open) {
          detailsEle.open = false
        }
      }

      function handleClick(e: MouseEvent) {
        if (!detailsEle.contains(e.target as HTMLElement)) {
          detailsEle.open = false
        }
      }

      document.addEventListener('keydown', handleKeydown)
      document.addEventListener('click', handleClick)

      return () => {
        document.removeEventListener('keydown', handleKeydown)
        document.removeEventListener('click', handleClick)
      }
    }, [])

    return <Component ref={ref} />
  }

  return WrappedComponent
}

export default withClose
