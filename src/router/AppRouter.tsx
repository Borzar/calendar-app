import { Route, Routes } from 'react-router-dom'
import { CalendarPage } from '../calendar/pages/CalendarPage'
import { LoginPage } from '../auth/pages/LoginPage'
import { checkAuthToken } from '../api/userAuth'
import { useEffect } from 'react'

export const AppRouter = () => {
  useEffect(() => {
    checkAuthToken()
  }, [])

  return (
    <Routes>
      <Route path='/' element={<CalendarPage />} />
      <Route path='/auth' element={<LoginPage />} />
    </Routes>
  )
}
