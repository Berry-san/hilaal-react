import { useState, useEffect } from 'react'
import { API_BASE } from '../middleware/API_BASE'
import axios from 'axios'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import qs from 'qs'
import BackButton from '../components/back-button'
import InputField from '../components/InputField'
import { getCertificate } from '../redux/features/successful-slice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import LoadingAnimation from '../components/Loading'
import Button from '../components/Button'

const BuyPolicy = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  // const [vehicleCategory, setVehicleCategory] = useState([])
  // const [vehicleMake, setVehicleMake] = useState([])
  // const [vehicleType, setVehicleType] = useState([])
  // const [vehicleColor, setVehicleColor] = useState([])
  const [data, setData] = useState({
    vehicleCategory: [],
    vehicleMake: [],
    vehicleColor: [],
    vehicleType: [],
  })
  const [error, setError] = useState(null)
  const [vehicleModel, setVehicleModel] = useState([])
  const [amount, setAmount] = useState('')
  const [formattedAmount, setFormattedAmount] = useState('')

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-api-key': 987654,
    },
  }

  const { role } = useSelector((state) => state.auth.user)

  const dispatch = useDispatch()

  let user_type_id

  if (!role) {
    user_type_id = 1
  } else {
    user_type_id = role
  }

  // const fetchData = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         'x-api-key': 987654,
  //       },
  //     }
  //     setIsFetching(true)

  //     const responses = await Promise.all([
  //       axios.get(API_BASE + 'vechile_category', config),
  //       axios.get(API_BASE + 'vechile_make', config),
  //       // axios.get('vechile_model', config),
  //       axios.get(API_BASE + 'vechile_type', config),
  //       axios.get(API_BASE + 'vechile_color', config),
  //     ])

  //     setVehicleCategory(responses[0].data.result)
  //     setVehicleMake(responses[1].data.result)
  //     // setVehicleModel(responses[2].data.result)
  //     setVehicleType(responses[2].data.result)
  //     setVehicleColor(responses[3].data.result)
  //     setIsFetching(false)
  //   } catch (error) {
  //     console.error('Error fetching data:', error)
  //     setIsFetching(false)
  //   }
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [])

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true)
      setError(null)

      const API_BASE = 'https://mosquepay.org/insurance_api/v1/api/'
      const endpoints = [
        `${API_BASE}vechile_category`,
        `${API_BASE}vechile_make`,
        `${API_BASE}vechile_color`,
        `${API_BASE}vechile_type`,
      ]

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-api-key': '987654',
        },
      }

      try {
        const [categoryResponse, makeResponse, colorResponse, typeResponse] =
          await Promise.all(
            endpoints.map((endpoint) => axios.get(endpoint, config))
          )
        setIsFetching(true)
        setData({
          vehicleCategory: categoryResponse.data.result,
          vehicleMake: makeResponse.data.result,
          vehicleColor: colorResponse.data.result,
          vehicleType: typeResponse.data.result,
        })
        setIsFetching(false)
      } catch (err) {
        setError('Error fetching data')
        console.error('Error fetching data:', err)
        setIsFetching(false)
      }
    }

    fetchData()
  }, [])

  const fetchVehicleModels = async (vehicleMakeId) => {
    try {
      const response = await axios.get(
        `${API_BASE}vehicle_model?vehicle_make_id=${vehicleMakeId}`,
        config
      )
      setVehicleModel(response.data.result)
    } catch (error) {
      console.error('Error fetching vehicle models:', error)
    }
  }

  const formatAmount = (amount) => {
    return new Intl.NumberFormat().format(amount)
  }

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value
    const selectedCategory = data.vehicleCategory.find(
      (category) => category.vehicle_category_id === selectedCategoryId
    )
    if (selectedCategory) {
      const formatted = formatAmount(selectedCategory.amount)
      setAmount(selectedCategory.amount)
      setFormattedAmount(formatted)
      uploadValues.setFieldValue('amount', selectedCategory.amount)
    }
    uploadValues.setFieldValue('vehicle_category_id', selectedCategoryId)
  }

  const handleAmountChange = (event) => {
    const inputAmount = event.target.value.replace(/,/g, '')
    setAmount(inputAmount)
    setFormattedAmount(formatAmount(inputAmount))
    uploadValues.setFieldValue('amount', inputAmount)
  }

  const handleMakeChange = (event) => {
    const selectedMakeId = event.target.value
    uploadValues.setFieldValue('vehicle_make_id', selectedMakeId)
    fetchVehicleModels(selectedMakeId)
  }

  const handleFileChange = (event) => {
    const { id, files } = event.target
    uploadValues.setFieldValue(id, files[0])
  }

  const validationSchema = Yup.object().shape({
    insured_name: Yup.string()
      .min(3, 'Must be more than three characters')
      .required('Insurer Name is required'),
    contact_address: Yup.string().required('Contact Address is required'),
    amount: Yup.number().required('Vehicle Amount is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phonenumber: Yup.string().required('Phone Number is required'),
    engine_no: Yup.string().required('Engine Number is required'),
    chasis_no: Yup.string().required('Chasis Number is required'),
    year_of_make: Yup.string().required('Year of Make is required'),
    registration_number: Yup.string().required(
      'Registration Number is required'
    ),
    engine_capacity: Yup.string().required('Engine Capacity is required'),
    vehicle_category_id: Yup.string().required('Vehicle Category is required'),
    vehicle_type_id: Yup.string().required('Vehicle Type is required'),
    vehicle_make_id: Yup.string().required('Vehicle Make is required'),
    vehicle_model_id: Yup.string().required('Vehicle Model is required'),
    vehicle_color_id: Yup.string().required('Vehicle Color is required'),
    image1: Yup.mixed().required('Image 1 is required'),
    image2: Yup.mixed().required('Image 2 is required'),
    image3: Yup.mixed().required('Image 3 is required'),
    isChecked: Yup.boolean()
      .oneOf([true], 'You must verify that these details belong to you.')
      .required('Verification is required'),
  })

  const uploadValues = useFormik({
    initialValues: {
      insured_name: '',
      contact_address: '',
      amount: '',
      email: '',
      phonenumber: '',
      engine_no: '',
      chasis_no: '',
      year_of_make: '',
      registration_number: '',
      engine_capacity: '',
      vehicle_category_id: '',
      vehicle_type_id: '',
      vehicle_make_id: '',
      vehicle_model_id: '',
      vehicle_color_id: '',
      image1: null,
      image2: null,
      image3: null,
      user_type_id,
      isChecked: false,
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      setIsLoading(true)
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': 987654,
        },
      }

      try {
        const response = await axios.post(
          'https://mosquepay.org/insurance_api/v1/api/new_hilail_third_party_payment',
          qs.stringify(uploadValues.values),
          config
        )
        console.log(response)
        if (response.data.status_code === '0') {
          toast.success(response.data.message)
          if (response.data.link) {
            localStorage.setItem(
              'apiResponse',
              JSON.stringify(response.data.result[0])
            )
            window.location.href = response.data.link
          } else {
            console.error('No link found in the response')
          }
          dispatch(getCertificate(response.data.result))
        } else {
          toast.error(response.data.message)
          console.error('Failed to fetch data')
        }
        setIsLoading(false)
      } catch (error) {
        toast.error(error)
        console.error('Error fetching data:', error)
      }
      setIsLoading(false)
    },
  })

  return isFetching ? (
    <div className="flex items-center justify-center">
      <LoadingAnimation />
    </div>
  ) : (
    <div>
      <div className="text-left">
        <div className="flex items-center mb-5 space-x-5">
          <BackButton />
          <h3 className="flex text-2xl font-bold text-left">
            Buy a new policy
          </h3>
        </div>
        <form onSubmit={uploadValues.handleSubmit} autoComplete="off">
          <div className="grid grid-cols-1 gap-3 text-left md:grid-cols-2 lg:grid-cols-3">
            <InputField
              type="text"
              label="Client Name"
              id="insured_name"
              value={uploadValues.values.insured_name}
              onChange={uploadValues.handleChange}
              onBlur={uploadValues.handleBlur}
              touched={uploadValues.touched.insured_name}
              errors={uploadValues.errors.insured_name}
            />
            <InputField
              type="text"
              label="Contact Address"
              id="contact_address"
              value={uploadValues.values.contact_address}
              onChange={uploadValues.handleChange}
              onBlur={uploadValues.handleBlur}
              touched={uploadValues.touched.contact_address}
              errors={uploadValues.errors.contact_address}
            />
            <div className="">
              <label htmlFor="" className="text-sm font-medium">
                Vehicle Category
              </label>
              <select
                value={uploadValues.values.vehicle_category_id}
                name="vehicle_category_id"
                onChange={handleCategoryChange}
                className={`w-full p-3 text-sm font-medium bg-[#f4f4f4] rounded ${
                  uploadValues.touched.vehicle_category_id &&
                  uploadValues.errors.vehicle_category_id
                    ? 'border border-red-500'
                    : ''
                }`}
              >
                <option>--</option>
                {data.vehicleCategory.map((option) => (
                  <option
                    key={option.vehicle_category_id}
                    value={option.vehicle_category_id}
                  >
                    {option.category}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label htmlFor="" className="text-sm font-medium">
                Vehicle Make
              </label>
              <select
                value={uploadValues.values.vehicle_make_id}
                name="vehicle_make_id"
                onChange={handleMakeChange}
                className={`w-full p-3 text-sm font-medium bg-[#f4f4f4] rounded ${
                  uploadValues.touched.vehicle_make_id &&
                  uploadValues.errors.vehicle_make_id
                    ? 'border border-red-500'
                    : ''
                }`}
              >
                <option>--</option>
                {data.vehicleMake.map((option) => (
                  <option
                    key={option.vehicle_make_id}
                    value={option.vehicle_make_id}
                  >
                    {option.make}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label htmlFor="" className="text-sm font-medium">
                Vehicle Model
              </label>
              <select
                value={uploadValues.values.vehicle_model_id}
                name="vehicle_model_id"
                onChange={uploadValues.handleChange}
                className={`w-full p-3 text-sm font-medium bg-[#f4f4f4] rounded ${
                  uploadValues.touched.vehicle_model_id &&
                  uploadValues.errors.vehicle_model_id
                    ? 'border border-red-500'
                    : ''
                }`}
              >
                <option>--</option>
                {vehicleModel.map((option) => (
                  <option
                    key={option.vehicle_model_id}
                    value={option.vehicle_model_id}
                  >
                    {option.model}
                  </option>
                ))}
              </select>
            </div>

            <div className="">
              <label htmlFor="" className="text-sm font-medium">
                Vehicle Color
              </label>
              <select
                value={uploadValues.values.vehicle_color_id}
                name="vehicle_color_id"
                onChange={uploadValues.handleChange}
                className={`w-full p-3 text-sm font-medium bg-[#f4f4f4] rounded ${
                  uploadValues.touched.vehicle_color_id &&
                  uploadValues.errors.vehicle_color_id
                    ? 'border border-red-500'
                    : ''
                }`}
              >
                <option>--</option>
                {data.vehicleColor.map((option) => (
                  <option
                    key={option.vehicle_color_id}
                    value={option.vehicle_color_id}
                  >
                    {option.color}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label htmlFor="" className="text-sm font-medium">
                Vehicle Type
              </label>
              <select
                value={uploadValues.values.vehicle_type_id}
                name="vehicle_type_id"
                onChange={uploadValues.handleChange}
                className={`w-full p-3 text-sm font-medium bg-[#f4f4f4] rounded ${
                  uploadValues.touched.vehicle_type_id &&
                  uploadValues.errors.vehicle_type_id
                    ? 'border border-red-500'
                    : ''
                }`}
              >
                <option>--</option>
                {data.vehicleType.map((option) => (
                  <option
                    key={option.vehicle_type_id}
                    value={option.vehicle_type_id}
                  >
                    {option.TYPE}
                  </option>
                ))}
              </select>
            </div>
            <InputField
              type="text"
              label="Engine Number"
              id="engine_no"
              value={uploadValues.values.engine_no}
              onChange={uploadValues.handleChange}
              onBlur={uploadValues.handleBlur}
              touched={uploadValues.touched.engine_no}
              errors={uploadValues.errors.engine_no}
            />
            <InputField
              type="number"
              label="Chasis Number"
              id="chasis_no"
              value={uploadValues.values.chasis_no}
              onChange={uploadValues.handleChange}
              onBlur={uploadValues.handleBlur}
              touched={uploadValues.touched.chasis_no}
              errors={uploadValues.errors.chasis_no}
            />
            <InputField
              type="text"
              label="Plate Number"
              id="registration_number"
              value={uploadValues.values.registration_number}
              onChange={uploadValues.handleChange}
              onBlur={uploadValues.handleBlur}
              touched={uploadValues.touched.registration_number}
              errors={uploadValues.errors.registration_number}
            />
            <InputField
              type="text"
              label="Engine capacity"
              id="engine_capacity"
              value={uploadValues.values.engine_capacity}
              onChange={uploadValues.handleChange}
              onBlur={uploadValues.handleBlur}
              touched={uploadValues.touched.engine_capacity}
              errors={uploadValues.errors.engine_capacity}
            />
            <InputField
              type="number"
              label="Year of Make"
              id="year_of_make"
              value={uploadValues.values.year_of_make}
              onChange={uploadValues.handleChange}
              onBlur={uploadValues.handleBlur}
              touched={uploadValues.touched.year_of_make}
              errors={uploadValues.errors.year_of_make}
            />
            <InputField
              type="text"
              label="Policy Amount"
              id="amount"
              value={formattedAmount}
              onChange={handleAmountChange}
              onBlur={uploadValues.handleBlur}
              touched={uploadValues.touched.amount}
              errors={uploadValues.errors.amount}
              disabled={true}
            />
            {/* <InputField type="text" label="Company name" /> */}
            <InputField
              type="tel"
              label="Phone number"
              id="phonenumber"
              value={uploadValues.values.phonenumber}
              onChange={uploadValues.handleChange}
              onBlur={uploadValues.handleBlur}
              touched={uploadValues.touched.phonenumber}
              errors={uploadValues.errors.phonenumber}
            />
            <InputField
              type="email"
              label="Email address"
              id="email"
              value={uploadValues.values.email}
              onChange={uploadValues.handleChange}
              onBlur={uploadValues.handleBlur}
              touched={uploadValues.touched.email}
              errors={uploadValues.errors.email}
            />
            <div className="">
              <label htmlFor="image1" className="text-sm font-medium">
                Upload Vehicle Lisence Document
              </label>
              <input
                type="file"
                id="image1"
                className={`w-full p-3 text-sm font-medium bg-[#f4f4f4] rounded ${
                  uploadValues.touched.image1 && uploadValues.errors.image1
                    ? 'border border-red-500'
                    : ''
                }`}
                onChange={handleFileChange}
                onBlur={uploadValues.handleBlur}
              />
            </div>
            <div className="">
              <label htmlFor="image2" className="text-sm font-medium">
                Upload National ID (NIN)
              </label>
              <input
                type="file"
                id="image2"
                // className="w-full p-3 text-sm font-medium bg-[#f4f4f4] rounded"
                className={`w-full p-3 text-sm font-medium bg-[#f4f4f4] rounded ${
                  uploadValues.touched.image2 && uploadValues.errors.image2
                    ? 'border border-red-500'
                    : ''
                }`}
                onChange={handleFileChange}
                onBlur={uploadValues.handleBlur}
              />
            </div>
            <div className="">
              <label htmlFor="image3" className="text-sm font-medium">
                Upload Utility Bill
              </label>
              <input
                type="file"
                id="image3"
                className={`w-full p-3 text-sm font-medium bg-[#f4f4f4] rounded ${
                  uploadValues.touched.image3 && uploadValues.errors.image3
                    ? 'border border-red-500'
                    : ''
                }`}
                onChange={handleFileChange}
                onBlur={uploadValues.handleBlur}
              />
            </div>
          </div>

          <div>
            <label className="flex items-center mt-3">
              <input
                type="checkbox"
                id="isChecked"
                checked={uploadValues.values.isChecked}
                onChange={uploadValues.handleChange}
                onBlur={uploadValues.handleBlur}
                error={
                  uploadValues.touched.isChecked &&
                  uploadValues.errors.isChecked
                }
              />
              <span className="ml-2">
                I verify that these details belong to me.
              </span>
            </label>
            {uploadValues.touched.isChecked && uploadValues.errors.isChecked ? (
              <p className="mt-1 text-xs font-medium text-red-500">
                {uploadValues.errors.isChecked}
              </p>
            ) : null}
          </div>
          <div className="flex items-end justify-end">
            <Button text="Make payment" disabled={isLoading} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default BuyPolicy
