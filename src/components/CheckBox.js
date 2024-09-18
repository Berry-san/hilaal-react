import { useState } from 'react'
const CheckBox = ({ text }) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }
  return (
    <div>
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span className="ml-2">Hello</span>
      </label>
      <p>Checkbox is {isChecked ? 'checked' : 'unchecked'}</p>
    </div>
  )
}

export default CheckBox
