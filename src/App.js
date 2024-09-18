import './App.css'
import { Route, Routes } from 'react-router'
import Layout from './Pages/Global/Layout'
import HomePage from './Pages/homepage'
import BuyPolicy from './Pages/buyPolicy'
import ConfirmDetails from './Pages/confirmDetails'
import SuccessPage from './Pages/successPage'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import RenewPolicy from './Pages/renewPolicy'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="buy-policy" element={<BuyPolicy />} />
        <Route path="renew-policy" element={<RenewPolicy />} />
        <Route path="renew-policy/:id" element={<ConfirmDetails />} />
        <Route path="success-page" element={<SuccessPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App
