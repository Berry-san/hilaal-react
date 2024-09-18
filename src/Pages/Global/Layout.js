import React from 'react'
import Nav from '../../components/Nav'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <div className="bg-cream">
      <Nav />
      <main className="px-5 py-5 md:px-24 lg:px-48 xl:pt-16">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
