import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth/pages'
import { CalendarPage } from '../calendar/pages'

export const AppRouter = () => {
  const validPage: string = 'authenticated'

  return (
    <Routes>
      {validPage === 'unauthenticated' ? (
        <Route path='/auth/*' element={<LoginPage />} />
      ) : (
        <Route path='/*' element={<CalendarPage />} />
      )}
    </Routes>
  )
}
