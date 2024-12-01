import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import logo from '../assets/images/logo.svg'
import Logout from './Logout'

const Nav = () => {
  const pathname = useLocation()
  const { isAuthenticated, username } = useSelector((state) => state.auth.user)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="flex items-center justify-between px-5 py-5 bg-white border-b md:px-24 lg:px-48 border-slate-200">
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} className="w-10 h-10" alt="logo" />
        <p className="hidden text-2xl font-bold text-maroon md:flex">
          Hilal Takaful
        </p>
      </Link>
      {isClient ? (
        isAuthenticated === false ? (
          pathname === '/login' || pathname === '/register' ? null : (
            <Link to="/login" className="font-semibold underline">
              Agent Login
            </Link>
          )
        ) : (
          <div className="flex items-center gap-6">
            <p>
              Welcome, <span className="font-extrabold">{username}</span>
            </p>
            <Logout />
          </div>
        )
      ) : (
        <p className="hidden">Loading...</p>
      )}
    </div>
  )
}

export default Nav
