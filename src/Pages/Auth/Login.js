'use client'

import { useState } from 'react'
import { API_BASE } from '../../middleware/API_BASE'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import qs from 'qs'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginSuccess } from '../../redux/features/auth-slice'

const Login = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const dontHaveAccount = "Don't have an account? "

  const loginValue = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
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
          API_BASE + 'user_login',
          qs.stringify(loginValue.values),
          config
        )
        console.log(response.data)
        if (response.data['status_code'] === '0') {
          const { email, username, user_type_id } =
            response.data.user_details[0]
          const loginData = {
            email,
            username,
            role: user_type_id,
            isAuthenticated: response.data['status_code'] === '0',
          }
          dispatch(loginSuccess(loginData))
          toast.success(response.data.message)
          navigate('/')
        } else {
          toast.error(response.data.message)
        }
        setLoading(false)
      } catch (error) {
        toast.error(error.message)
        console.log(error)
        setError(error)
        setLoading(false)
      }
      console.log(loading)
    },
  })
  return (
    <div className="bg-[#fff] shadow max-w-md mx-auto rounded-md md:mt-20">
      <div className="px-10 pt-6 pb-3 text-center bg-white">
        <h1 className="text-2xl text-dark">Log In</h1>
      </div>
      <div className="px-10 pb-6">
        <div>
          <form onSubmit={loginValue.handleSubmit}>
            <div className="flex flex-col gap-3 text-left">
              <div className="">
                <label htmlFor="" className="mb-2 text-sm font-semibold">
                  Email Address:
                </label>
                <input
                  type="email"
                  className="w-full bg-[#f4f4f4] px-5 py-2 mt-2 focus:outline-none rounded-md"
                  id="email"
                  name="email"
                  value={loginValue.values.email}
                  onChange={loginValue.handleChange}
                  onBlur={loginValue.handleBlur}
                />
                {loginValue.touched.email && loginValue.errors.email ? (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    {loginValue.errors.email}
                  </p>
                ) : null}
              </div>
              <div className="relative gap-3">
                <label htmlFor="" className="text-sm font-semibold">
                  Password:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full bg-[#f4f4f4] px-5 py-2 mt-2 focus:outline-none rounded-md"
                    id="password"
                    name="password"
                    value={loginValue.values.password}
                    onChange={loginValue.handleChange}
                    onBlur={loginValue.handleBlur}
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
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <button
                className="w-full py-3 mt-5 text-xs font-semibold text-white rounded bg-dark"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Log in'}
              </button>
              {/* <Link to="/ResetPassword" className="mt-5 text-sm font-semibold">
                Forgot Password ?
              </Link> */}
            </div>
            <p className="mt-5 text-sm text-center">
              {dontHaveAccount}
              <Link to="/register">
                <span className="text-sm font-semibold underline">Sign Up</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
