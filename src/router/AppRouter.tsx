import { Route, Routes } from 'react-router-dom'
import { CalendarPage, CalendarRegister } from '../calendar/pages'

export const AppRouter = () => {
  const validPage: string = 'authenticated'

  return (
    <Routes>
      <Route path='/' element={<CalendarPage />} />
      <Route path='/register' element={<CalendarRegister />} />)
    </Routes>
  )
}
