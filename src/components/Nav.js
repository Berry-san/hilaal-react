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
    <div className="flex items-center justify-between px-5 py-5 md:px-24 lg:px-48 bg-white border-b border-slate-200">
      <Link to="/" className="flex gap-3 items-center">
        <img src={logo} className="w-10 h-10" alt="logo" />
        <p className="text-maroon font-bold text-2xl hidden md:flex">
          Hilal Takaful
        </p>
      </Link>
      {isClient ? (
        isAuthenticated === false ? (
          pathname === '/login' || pathname === '/register' ? null : (
            <Link to="/login" className="underline font-semibold">
              Agent Login
            </Link>
          )
        ) : (
          <p>
            Welcome, <span className="font-extrabold">{username}</span>
          </p>
        )
      ) : (
        <p className="hidden">Loading...</p>
      )}
    </div>
  )
}

export default Nav
