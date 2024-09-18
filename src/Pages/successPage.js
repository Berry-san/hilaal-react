import Button from '../components/Button'
import { useState, useEffect } from 'react'
import axios from 'axios'
import qs from 'qs'
import { useNavigate } from 'react-router'
import success from '../assets/icons/success.svg'
import { API_BASE } from '../middleware/API_BASE'

const SuccessPage = () => {
  const [apiResponse, setApiResponse] = useState(null)
  const [checked, setChecked] = useState(false)
  const [certificateLink, setCertificateLink] = useState('')

  useEffect(() => {
    const retrieveData = () => {
      try {
        const storedData = localStorage.getItem('apiResponse')
        if (storedData !== null) {
          setApiResponse(JSON.parse(storedData))
        }
      } catch (error) {
        console.error('Error retrieving data:', error)
      }
    }
    retrieveData()
  }, [])

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': 987654,
      },
    }

    const checkTransaction = async () => {
      try {
        if (apiResponse) {
          const response = await axios.post(
            'https://mosquepay.org/insurance_api/v1/api/checker',
            qs.stringify({
              trans_reference: apiResponse.trans_reference,
            }),
            config
          )
          console.log('B', response.data)
          if (response.data.status_code === 0) {
            setChecked(true)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    checkTransaction()
    const intervalId = setInterval(checkTransaction, 60000)

    return () => clearInterval(intervalId)
  }, [apiResponse])

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': 987654,
      },
    }

    const getCertificate = async () => {
      try {
        console.log('apiResponse:', apiResponse)
        if (apiResponse) {
          const response = await axios.post(
            'https://mosquepay.org/insurance_api/v1/api/buy_insurance',
            qs.stringify(
              apiResponse
              // trans_reference: '2024050109014917490552102',
              // insured_name: 'Sam',
              // contact_address: 'no 7 adeola road',
              // amount: '15000',
              // email: 'profshubby@gmail.com',
              // phonenumber: '09067508765',
              // engine_no: '345673245677987',
              // chasis_no: '87654321908765',
              // year_of_make: '2034',
              // registration_number: '56478698',
              // engine_capacity: '1.3hl',
              // category: 'Car',
              // color: 'White',
              // make: 'Toyota',
              // model: 'Camry',
              // type: 'Private',
            ),
            config
          )
          console.log('A', response.data)
          if (response.data.status_code === '0') {
            if (response.data.link) {
              setCertificateLink(response.data.link)
              console.log(response.data.link)
            }
          }
        }
      } catch (error) {
        console.error('Error posting data:', error)
      }
    }

    getCertificate()
  }, [apiResponse])

  const printCertificate = () => {
    window.open(certificateLink, '_blank')
  }

  // console.log(apiResponse)
  // console.log(certificateLink)
  console.log(checked)

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-6">
        <img src={success} alt="success" className="w-56 h-56" />
        <p className="text-green-400 text-2xl font-bold">Payment Successful</p>
      </div>
      <div className="mt-10 flex items-center justify-center">
        {/* <Button onClick={printCertificate} text="Download Certificate" /> */}
        {
          <button
            type="submit"
            onClick={printCertificate}
            className={`flex items-center justify-center px-3 py-3 text-md text-white rounded bg-dark ${
              !checked ? 'button-disabled' : ''
            }`}
            disabled={!checked}
          >
            Download Certificate
          </button>
        }
      </div>
    </>
  )
}

export default SuccessPage
