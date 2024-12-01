// import { useNavigate } from 'react-router'

// const Logout = () => {
//   const navigate = useNavigate()

//   const handleLogout = () => {
//     sessionStorage.clear()
//     localStorage.clear()
//     navigate('/login')
//   }

//   return (
//     <button onClick={handleLogout} className="underline">
//       Logout
//     </button>
//   )
// }
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import logUserOut from '../redux/features/auth-slice'
import { logUserOut } from '../redux/features/auth-slice'

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const handleLogout = () => {
  //   sessionStorage.clear()
  //   localStorage.clear()
  //   dispatch(logOut())
  //   navigate('/login') // Redirect to login page
  // }

  const handleLogout = () => {
    try {
      sessionStorage.clear()
      localStorage.clear()
      dispatch(logUserOut())
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <button onClick={handleLogout} className="font-bold text-red-600 underline">
      Logout
      {/* write logout svg */}
    </button>
  )
}

export default Logout
