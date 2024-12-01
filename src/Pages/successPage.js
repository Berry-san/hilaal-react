import { useState, useEffect } from 'react'
import axios from 'axios'
import qs from 'qs'
import success from '../assets/icons/success.svg'
import { generateCertificateHTML } from '../utils/certificateUtils'

const SuccessPage = () => {
  const [userData, setUserData] = useState(null)
  const [certificateData, setCertificateData] = useState(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const retrieveData = () => {
      try {
        const storedData = localStorage.getItem('certificateData')
        if (storedData !== null) {
          setUserData(JSON.parse(storedData))
        }
      } catch (error) {
        console.error('Error retrieving data:', error)
      }
    }
    retrieveData()
  }, [])

  console.log(userData)

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': 987654,
      },
    }

    const checkTransaction = async () => {
      try {
        if (userData) {
          const response = await axios.post(
            'https://mosquepay.org/insurance_api/v1/api/checker',
            qs.stringify({
              trans_reference: userData.trans_reference,
            }),
            config
          )
          if (response.data.status_code === 0) {
            setChecked(true)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    checkTransaction()
    const intervalId = setInterval(checkTransaction, 30000)

    return () => clearInterval(intervalId)
  }, [userData])

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': 987654,
      },
    }

    const getCertificate = async () => {
      try {
        // if (userData) {
        const response = await axios.post(
          'https://mosquepay.org/insurance_api/v1/api/buy_insurance',
          qs.stringify(userData),
          // qs.stringify({
          //   trans_reference: '2024101717383329759960616',
          //   insured_name: 'Jon Dorian',
          //   contact_address:
          //     'Blk 9, Flat 2 Omole Phase 1 Housing Estate, Ikeja, Lagos.',
          //   engine_capacity: '450hl',
          //   engine_no: '8205823958',
          //   chasis_no: '243424324324',
          //   year_of_make: '2024',
          //   registration_number: 'ISL145JI',
          //   email: 'sanusiu111@gmail.com',
          //   phonenumber: '09020033873',
          //   type: 'Private',
          //   category: 'Car',
          //   make: 'Honda',
          //   model: 'Ridgeline',
          //   color: 'Navy blue',
          // }),
          config
        )
        console.log(response.data.result[0])
        if (response.data.status_code === '0' && response.data.link) {
          setCertificateData(response?.data.result[0])
          // }
        }
      } catch (error) {
        console.error('Error posting data:', error)
      }
    }

    getCertificate()
  }, [userData])

  const handlePrintCertificate = () => {
    if (!certificateData) {
      console.error('No certificate data available to print')
      return
    }

    const effectiveDate = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
    const expiryDate = new Date()
    expiryDate.setFullYear(expiryDate.getFullYear() + 1)
    const formattedExpiryDate = expiryDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })

    // Generate HTML content for the certificate
    const htmlContent = generateCertificateHTML(
      certificateData,
      effectiveDate,
      formattedExpiryDate
    )

    // Open a new window for printing
    const printWindow = window.open('', '_blank')
    printWindow.document.open()
    printWindow.document.write(htmlContent)
    printWindow.document.close()

    // Trigger the print action
    printWindow.onload = () => {
      printWindow.print()
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-6">
        <div class="relative flex justify-center items-center w-56 h-56">
          <div class="relative z-10 p-5 rounded-full bg-[#1FBE79] shadow-ripples">
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_4008_49)">
                <circle cx="25" cy="25" r="25" fill="#20BE79" />
                <path
                  d="M24.602 26.7589L26.014 28.1709L34.4795 19.7053L35.8938 21.1195L26.014 30.9993L19.65 24.6353L21.0642 23.2211L23.189 25.3459L24.602 26.7589ZM24.6037 23.9312L29.5563 18.9785L30.9666 20.3888L26.014 25.3414L24.6037 23.9312ZM21.777 29.5863L20.364 30.9993L14 24.6353L15.4142 23.2211L16.8272 24.6342L16.826 24.6353L21.777 29.5863Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_4008_49">
                  <rect width="50" height="50" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>

        <p className="text-2xl font-bold text-green-400">Payment Successful</p>
      </div>
      <div className="flex items-center justify-center mt-10">
        <button
          type="submit"
          onClick={handlePrintCertificate}
          // className={`flex items-center justify-center px-3 py-3 text-md text-white rounded bg-dark ${
          //   !checked ? 'button-disabled' : ''
          // }`}
          className="flex items-center justify-center px-3 py-3 text-white rounded text-md bg-dark"
          // disabled={!checked}
        >
          Download Certificate
        </button>
        {/* <button onClick={handleDownloadPDF}>Download as PDF</button> */}
      </div>
    </>
  )
}

export default SuccessPage
