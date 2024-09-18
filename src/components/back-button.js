import { useNavigate } from 'react-router'
import back from '../assets/icons/back-button.svg'
const BackButton = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  return (
    <button onClick={goBack} className="px-4 py-3 rounded-full bg-dark">
      <img alt="back" src={back} className="w-3 h-5" />
    </button>
  )
}

export default BackButton
