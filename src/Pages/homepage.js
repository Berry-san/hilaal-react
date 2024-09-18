import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import arrow from '../assets/icons/right-arrow.svg'
import image1 from '../assets/images/18108.jpg'
import image2 from '../assets/images/125165.jpg'
import axios from 'axios'

const pages = [
  {
    link: '/buy-policy',
    title: 'Buy a new Policy',
    text: 'You haven’t purchased a policy with Hilal in the past, start here.',
    image: image1,
  },
  {
    link: '/renew-policy',
    title: 'Renew your Policy',
    text: 'Retrieve your details and generate a certificate instantly',
    image: image2,
  },
]

export default function HomePage() {
  const { user } = useSelector((state) => state.auth)
  const { email } = user

  return (
    <main className="">
      <p className="text-xl font-semibold">
        Welcome to Hilal’s Motor takaful. Drive your car while we protect you
        maximally.
      </p>
      <div className="flex flex-col gap-5 mt-5 md:flex-row">
        {pages.map((page, index) => {
          return (
            <Link
              to={page.link}
              key={index}
              className="w-full border rounded-md shadow-lg border-slate-200"
            >
              <div className="rounded-md">
                <img
                  src={page.image}
                  loading="lazy"
                  alt="text"
                  className="object-cover rounded-t-md h-56 w-full"
                />
              </div>

              <section className="flex justify-between p-5">
                <div className="flex flex-col gap-3">
                  <h2 className="font-extrabold text-xl">{page.title}</h2>
                  <p>{page.text}</p>
                </div>
                <img src={arrow} alt="logo" />
              </section>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
