import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarPage } from '../calendar/pages'
import { LoginPage } from '../auth/pages'
import {checkAuthToken} from '../api/userAuth'

export const AppRouter = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const getTokenValidation = localStorage.getItem('token')
    if (!getTokenValidation) {
      return navigate('/auth')
    }
  }, [])

  useEffect(() => {
    checkAuthToken()
  }, [])

  console.log(checkAuthToken)

  return (
    <Routes>
        <Route path='/' element={<CalendarPage />} />
        <Route path='/auth' element={<LoginPage />} />
    </Routes>
  )
}
