'use client'

import InputField from '../components/InputField'
import Button from '../components/Button'
import Card from '../components/Card'
import BackButton from '../components/back-button'
import axios from 'axios'
import { API_BASE } from '../middleware/API_BASE'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import qs from 'qs'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { getSinglePolicy } from '../redux/features/policy-slice'
import { useDispatch } from 'react-redux'
import LoadingAnimation from '../components/Loading'

const RenewPolicy = () => {
  const [loading, setLoading] = useState(false)
  const [policies, setPolicies] = useState([])
  const [vehicleCategory, setVehicleCategory] = useState([])
  const [vehicleMake, setVehicleMake] = useState([])
  const [vehicleModel, setVehicleModel] = useState([])
  const [yearOfMake, setYearOfMake] = useState([])

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-api-key': 987654,
    },
  }

  const dispatch = useDispatch()

  const validationSchema = Yup.object().shape({
    phonenumber: Yup.string().required('Phone Number is required'),
  })

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-api-key': 987654,
        },
      }
      setLoading(true)

      const responses = await Promise.all([
        axios.get(API_BASE + 'vechile_category', config),
        axios.get(API_BASE + 'vechile_make', config),
        // axios.get(API_BASE + 'vechile_model', config),
      ])

      setVehicleCategory(responses[0].data.result)
      setVehicleMake(responses[1].data.result)
      // setVehicleModel(responses[2].data.result)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchVehicleModels = async (vehicleMakeId) => {
    try {
      const response = await axios.get(
        `${API_BASE}vehicle_model?vehicle_make_id=${vehicleMakeId}`,
        config
      )
      setVehicleModel((prevState) => ({
        ...prevState,
        [vehicleMakeId]: response.data.result,
      }))
    } catch (error) {
      console.error('Error fetching vehicle models:', error)
    }
  }

  const getMakeNameById = (id) => {
    const make = vehicleMake.find((make) => make.vehicle_make_id === id)
    return make ? make.make : 'Unknown'
  }

  const getModelNameById = (makeId, modelId) => {
    const models = vehicleModel[makeId] || []
    const model = models.find((model) => model.vehicle_model_id === modelId)
    return model ? model.model : 'Unknown'
  }

  const getCategoryNameById = (id) => {
    const category = vehicleCategory.find(
      (category) => category.vehicle_category_id === id
    )
    return category ? category.category : 'Unknown'
  }

  const renewValues = useFormik({
    initialValues: {
      phonenumber: '',
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      setLoading(true)

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': 987654,
        },
      }

      try {
        const response = await axios.post(
          API_BASE + 'get_third_party_renewal',
          qs.stringify(renewValues.values),
          config
        )
        if (response.data['status_code'] === '0') {
          setPolicies(response.data.result)
          response.data.result.forEach((policy) => {
            fetchVehicleModels(policy.vehicle_make_id)
          })
          setLoading(false)
        } else {
          setLoading(false)
          console.error(response.data.message)
          toast.error(response.data.message)
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    dispatch(getSinglePolicy(policies))
  }, [policies, dispatch])

  return (
    <>
      <section className="border-b border-slate-300">
        <div className="flex items-center mb-5 space-x-5">
          <BackButton />
          <h3 className="flex text-2xl font-bold text-left">
            Renew your policy
          </h3>
        </div>
        <p className="mb-5 font-bold">
          Retrieve your vehicle details with your phone number
        </p>
        <form
          onSubmit={renewValues.handleSubmit}
          className="flex flex-col pb-10 space-y-2"
        >
          <label>Phone number</label>
          <div className="flex flex-col space-y-2 md:space-y-0 md:space-x-2 md:flex-row ">
            <input
              id="phonenumber"
              name="phonenumber"
              value={renewValues.values.phonenumber}
              type="text"
              className="px-3 py-2 border border-gray-300 rounded-md md:w-1/3 focus:outline-none"
              placeholder="Enter details..."
              onChange={renewValues.handleChange}
              onBlur={renewValues.handleBlur}
            />
            <Button text="Retrive details" disabled={loading} />
          </div>
          {renewValues.touched.phonenumber && renewValues.errors.phonenumber ? (
            <p className="mt-1 text-xs font-medium text-red-500">
              {renewValues.errors.phonenumber}
            </p>
          ) : null}
        </form>
      </section>
      <section className="">
        {policies.length === 0 ? (
          <p>No Policies Available</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 pt-10 md:grid-cols-3">
            {loading ? (
              <LoadingAnimation />
            ) : (
              policies.map((policy, index) => (
                <Card
                  key={index}
                  id={policy.id}
                  // vehicleMake={policy.vehicle_make_id}
                  vehiclePlateNumber={policy.registration_number}
                  // lastPolicy={policy.time_out}
                  vehicleMake={getMakeNameById(policy.vehicle_make_id)}
                  vehicleModel={getModelNameById(
                    policy.vehicle_make_id,
                    policy.vehicle_model_id
                  )}
                  vehicleCategory={getCategoryNameById(
                    policy.vehicle_category_id
                  )}
                  chasisNo={policy.chasis_no}
                  engineNo={policy.engine_no}
                  yearOfMake={policy.year_of_make}
                />
              ))
            )}
          </div>
        )}
      </section>
    </>
  )
}

export default RenewPolicy
