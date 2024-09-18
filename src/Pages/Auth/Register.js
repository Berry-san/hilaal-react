import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import qs from 'qs'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { API_BASE } from '../../middleware/API_BASE'
import { Link, useNavigate } from 'react-router-dom'
// import Button from '../components/Button'

const Register = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState([])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': 987654,
      },
    }

    axios
      .get(API_BASE + 'user_type', config)
      .then((res) => {
        setUserType(res.data.result)
      })
      .catch((err) => console.log(err))
  }, [])

  const validationSchema = Yup.object({
    firstname: Yup.string()
      .min(3, 'Must be more than three characters')
      .required('Required'),
    lastname: Yup.string()
      .min(3, 'Must be more than three characters')
      .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    // phone_number: Yup.string().required('Provide a valid phone number'),
    password: Yup.string()
      .min(8, 'Password must be 8 characters long')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol'),
  })

  const signUpValue = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      phonenumber: '',
      password: '',
      user_type_id: '',
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      setLoading(true)
      setError(null)

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': 987654,
        },
      }

      try {
        const response = await axios.post(
          API_BASE + 'users_account_creation',
          qs.stringify(signUpValue.values),
          config
        )
        console.log(response)

        if (response.data.status_code === '0') {
          toast.success(response.data.message)
          navigate('/login')
        } else {
          toast.error(response.data.message)
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        setError(error)
        setLoading(false)
      }
    },
  })

  return (
    <div className="flex items-center justify-center md:mt-20">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col items-center justify-center bg-[#fff]  border max-w-xl mx-auto rounded-md">
          <div className="px-10 py-6">
            <div className="flex items-center justify-center mb-5 ">
              <h1 className="text-2xl text-dark">Register</h1>
            </div>
            <div>
              <form onSubmit={signUpValue.handleSubmit}>
                <div className="grid grid-cols-1 text-left md:grid-cols-2 gap-x-5 gap-y-5 ">
                  <div>
                    <label htmlFor="" className="text-xs font-semibold">
                      First Name:
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
                      id="firstname"
                      name="firstname"
                      value={signUpValue.values.firstname}
                      onChange={signUpValue.handleChange}
                      onBlur={signUpValue.handleBlur}
                    />
                    {signUpValue.touched.firstname &&
                    signUpValue.errors.firstname ? (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {signUpValue.errors.firstname}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="" className="text-xs font-semibold">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
                      id="lastname"
                      name="lastname"
                      value={signUpValue.values.lastname}
                      onChange={signUpValue.handleChange}
                      onBlur={signUpValue.handleBlur}
                    />
                    {signUpValue.touched.lastname &&
                    signUpValue.errors.lastname ? (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {signUpValue.errors.lastname}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="" className="text-xs font-semibold">
                      Phone Number:
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
                      id="phonenumber"
                      name="phonenumber"
                      value={signUpValue.values.phonenumber}
                      onChange={signUpValue.handleChange}
                      onBlur={signUpValue.handleBlur}
                    />
                    {signUpValue.touched.phonenumber &&
                    signUpValue.errors.phonenumber ? (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {signUpValue.errors.phonenumber}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="" className="text-xs font-semibold">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
                      id="email"
                      name="email"
                      value={signUpValue.values.email}
                      onChange={signUpValue.handleChange}
                      onBlur={signUpValue.handleBlur}
                    />
                    {signUpValue.touched.email && signUpValue.errors.email ? (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {signUpValue.errors.email}
                      </p>
                    ) : null}
                  </div>
                  <div className="">
                    <label htmlFor="" className="text-sm font-medium">
                      User Type
                    </label>
                    <select
                      value={signUpValue.values.user_type_id}
                      name="user_type_id"
                      onChange={signUpValue.handleChange}
                      className="w-full p-3 text-sm font-medium bg-[#f4f4f4] rounded"
                    >
                      <option>--</option>
                      <option value="1">Agent</option>
                      <option value="2">Admin User</option>
                      {/* {userType.map((option) => (
                        <option
                          key={option.user_type_id}
                          value={option.user_type_id}
                        >
                          {option.user_type}
                        </option>
                      ))} */}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="" className="text-xs font-semibold">
                      Password:
                    </label>
                    <div>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
                          id="password"
                          name="password"
                          value={signUpValue.values.password}
                          onChange={signUpValue.handleChange}
                          onBlur={signUpValue.handleBlur}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>

                      {signUpValue.touched.password &&
                      signUpValue.errors.password ? (
                        <p className="mt-1 text-xs font-medium text-red-500">
                          {signUpValue.errors.password}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:justify-between w-full mt-5 gap-5 md:gap-0">
                  <p className="text-sm order-2 md:order-1">
                    Existing User?{' '}
                    <Link to="/login">
                      <span className="font-semibold underline">Log In</span>
                    </Link>
                  </p>
                  <button
                    type="submit"
                    className="px-4 py-3 text-white rounded bg-dark order-1 lg:order-2 w-full md:w-40"
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Register'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Register
