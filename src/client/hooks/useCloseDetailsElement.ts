import { useEffect, useRef } from 'react'

const useCloseDialogElement = () => {
  const ref = useRef<HTMLDetailsElement | null>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const detailsElement = ref.current

    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape' && detailsElement.open) {
        detailsElement.open = false
      }
    }

    function handleClick(e: MouseEvent) {
      if (!detailsElement.contains(e.target as HTMLElement)) {
        detailsElement.open = false
      }
    }

    document.addEventListener('keydown', handleKeydown)
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return ref
}

export default useCloseDialogElement
