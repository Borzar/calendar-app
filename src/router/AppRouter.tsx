import { Route, Routes } from 'react-router-dom'
import { CalendarPage } from '../calendar/pages/CalendarPage'

export const AppRouter = () => {
  const validPage: string = 'authenticated'

  return (
    <Routes>
      <Route path='/' element={<CalendarPage />} />
    </Routes>
  )
}
