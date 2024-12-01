import LoadingAnimation from './Loading'

const Button = ({ text, onClick, image, disabled }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="flex items-center justify-center w-full px-2 py-3 text-white rounded cursor-pointer text-md bg-dark md:w-40"
      disabled={disabled}
    >
      {disabled ? <LoadingAnimation /> : text}
      {image && <img src={image} alt="" className="w-5 h-5 ml-3" />}
    </button>
  )
}

export default Button
