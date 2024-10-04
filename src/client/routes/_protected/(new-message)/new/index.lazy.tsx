import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected/(new-message)/new/')({
  component: () => <div>Hello /_protected/(new-message)/new/!</div>,
})
