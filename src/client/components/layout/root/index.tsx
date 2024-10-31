import { Outlet } from '@tanstack/react-router'
import TanStackRouterDevtools from '../../dev-tools'
import Footer from './footer'
import Header from './header'
import MobileMenu from './mobile-menu'

const RootLayout = () => {
  return (
    <>
      <Header />
      <MobileMenu />

      <div className='container my-20 flex-1'>
        <Outlet />
      </div>

      <Footer />

      <TanStackRouterDevtools />
    </>
  )
}

export default RootLayout
