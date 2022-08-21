import { addHours } from 'date-fns'
import { useState } from 'react'

const defaultEvents = [
  {
    _id: new Date().getTime(),
    title: 'evento1',
    notes: 'notas del evento1',
    start: new Date(),
    end: addHours(new Date(), 1),
    bgColor: '#D0EBFF',
    user: {
      _id: '123',
      name: 'boris',
    },
  },
]

export const useCalendarEvents = () => {
  const [myEvents, setMyEvents] = useState(defaultEvents)

  return {
    myEvents,
    setMyEvents,
  }
}
