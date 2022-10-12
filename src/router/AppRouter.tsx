import { Route, Routes } from 'react-router-dom'
import { CalendarPage } from '../calendar/pages/CalendarPage'
import { LoginPage } from '../auth/pages/LoginPage'

export const AppRouter = () => {
  const validPage: string = 'authenticated'

  return (
    <Routes>
      <Route path='/' element={<CalendarPage />} />
      <Route path='/auth' element={<LoginPage />} />
    </Routes>
  )
}
