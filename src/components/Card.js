'use client'

import Button from './Button'
import { useNavigate } from 'react-router'
import reload from '../assets/icons/reload.svg'
const Card = ({
  vehiclePlateNumber,
  vehicleMake,
  vehicleModel,
  vehicleCategory,
  lastPolicy,
  id,
  chasisNo,
  engineNo,
  yearOfMake,
}) => {
  const navigate = useNavigate()
  const handleRenewPolicyClick = () => {
    navigate(`/renew-policy/${id}`)
  }
  return (
    <div className="p-5 space-y-3 bg-white border rounded border-slate-200 text-bold">
      {/* <p className="">
        Vehicle Plate Number:{' '}
        <span className="text-slate-400">{vehiclePlateNumber}</span>
      </p>
      <p className="">
        Vehicle Make: <span className="text-slate-400">{vehicleMake}</span>
      </p>
      <p className="">
        Last Policy: <span className="text-slate-400">{lastPolicy}</span>
      </p> */}

      <p className="">
        Vehicle:{' '}
        <span className="text-slate-400">
          {vehicleMake} {vehicleModel}
        </span>
      </p>
      <p className="">
        Plate Number:{' '}
        <span className="text-slate-400">{vehiclePlateNumber}</span>
      </p>
      <p className="">
        Vehicle Category:{' '}
        <span className="text-slate-400">{vehicleCategory}</span>
      </p>

      <div className="flex justify-end">
        <Button
          text="Renew Policy"
          image={reload}
          onClick={handleRenewPolicyClick}
        />
      </div>
    </div>
  )
}

export default Card
