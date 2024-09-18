import { useNavigate } from 'react-router'

const Logout = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.clear()
    localStorage.clear()
    navigate('/login')
  }

  return (
    <button onClick={handleLogout} className="underline">
      Logout
    </button>
  )
}

export default Logout
