import { Route, Routes } from 'react-router-dom'
import { CalendarPage } from '../calendar/pages'
import {EventsPage} from '../calendar/pages/EventsPage'

export const AppRouter = () => {
  const validPage: string = 'authenticated'

  return (
    <Routes>
      <Route path='/' element={<CalendarPage />} />
      <Route path='/calendarPage' element={<CalendarPage />} />
      <Route path='/events' element={<EventsPage/>} />
    </Routes>
  )
}
