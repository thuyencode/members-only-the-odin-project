import TanStackRouterDevtools from '@/client/components/dev-tools'
import { Outlet } from '@tanstack/react-router'
import Footer from './footer'
import Header from './header'

const RootLayout = () => {
  return (
    <>
      <Header />

      <div className='container my-10 flex-1'>
        <Outlet />
      </div>

      <Footer />

      <TanStackRouterDevtools />
    </>
  )
}

export default RootLayout
